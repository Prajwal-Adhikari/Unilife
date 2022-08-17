const router = require("express").Router();
const User = require("../models/users.js");
const CryptoJS = require("crypto-js");  //Crypto is a module in Node. js which deals with an algorithm that performs data encryption and decryption
const jwt = require('jsonwebtoken');    //jwt -> jsonwebtoken

//REGISTER
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
         console.log(savedUser);
    }catch(err){
       res.status(500).json(err);
    }
});

//LOGIN
router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user)
        {
            res.status(401).json("Wrong Credentials !!!");
            return;
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(originalpassword !== req.body.password){
            res.status(401).json("Wrong Credentials !!!");
            return;
        } 

        const accessToken = jwt.sign({
            id : user._id, 
            isAdmin : user.isAdmin,
        }, 
        process.env.JWT_SEC,
        {expiresIn : "3d"}
        );

        const { password, ...others} = user._doc;   //cause everything is stored in doc file
        res.status(200).json({...others,accessToken}); //currently this not working
    }catch(err)
    {
        res.status(500).json(err);
    }
});

module.exports = router;