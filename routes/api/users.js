const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');
 
//For email-verification 
const mailgun = require("mailgun-js");
const { validateRequest } = require('twilio');
const DOMAIN = config.get("MAILGUN_DOMAIN"); 
const mg = mailgun({apiKey: config.get('MAILGUN_APIKEY'), domain: DOMAIN});


let newUserToken = 0;
let forVerification = 0 ;
const OTPgenerator = function(mode){
  //mode 0 : for generating otp, 1: for checking otp and reseting the function
  if(!mode)
  {
    let otp=Math.floor(Math.random()*10);
    for(let i=0;i<5;i++){
        const foo = Math.floor(Math.random()*10);
        if(foo%2==0){
            const alphabet = "abcdefghijklmnopqrstuvwxyz"
            otp = otp+alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
        }
        else{
            const forNumber = Math.floor(Math.random()*10);
            otp=otp+forNumber.toString();
        }
    }
    forVerification=otp;
    return otp;
  }

  if(mode){
    const temp =  forVerification;
    forVerification = 0;
    return temp;
  }

}

Router.post('/verification',(req,res)=>{
    const _otp = req.body.otp;
    if(_otp===OTPgenerator(1))
    {
        const token = newUserToken;
        newUserToken = 0;
        if(token){
            jwt.verify(token,config.get("JWT_ACC_ACTIVATE"),function(err,decodedToken){
                if(err){
                    return res.status(400).json({error:"Incorrect or expired"});
                }
                const {name,email,password} = decodedToken;
                User.findOne({
                    email:email
                })
                .then(user=>{
                    if(user){
                        return res.status(400).json({
                            email : "Email already exists"
                        });
                    }else{
                        const newUser = new User({
                            name,
                            email,
                            password,
                            verified:true
                        });

                        //Hash password before saving in database
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => res.json(user)
                                        //res.redirect('/users/login')
                                    )
                                    .catch(err => console.log(err));
                            });
                        });
                    }
                });
            });
        }
        
    }
    else{
        console.log("wrong OTP");
    }
    
})


//Post Router api/users/register
Router.post('/register', (req, res) => {
    //Form Validation
    //Destructuring Values
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const {
        name,
        email,
        password,
        verified
       } = req.body;   

    User.findOne(
        {
            email:email
        })
    .then(user => {
        if (user) {
            return res.status(400).json({
                email: "Email already exists"
            });
        } else {
            newUserToken = jwt.sign({name,email,password,verified},config.get("JWT_ACC_ACTIVATE"),{expiresIn:'10m'});
            if(!verified)
            {
                try{
                    //mail options
                    const data = {
                        from: 'admin@unilife.com.np',
                        to: req.body.email,
                        subject: 'Account verification',
                        html : `
                            <h2> Below is the activation key for your new Unilife account.</h2>
                            <p>Hello and welcome to unilife, We hope for your joyful and pleasant experience here in unilife. Below is the OTP for your new account please don't share it with any one.</p>
                            <p align="center"><h2>${OTPgenerator(0)}</h2></p>
                        `
                        }; 
                        mg.messages().send(data, function (error, body) {
                            if(error){
                                return res.json({
                                    message : error.message
                                });
                            }
                            console.log(body);
                            return res.json({message : "OTP has been sent to your email, please check it out !!!"})
                        });
                }catch(error){
                    return res.json({
                        message : error.message
                    });
                }
            }
        }
    });
});

//Post Router api/users/login
Router.post('/login', (req, res) => {
    //Login Validation
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find User By Email
    User.findOne({
        email:email
    }).then(user => {
        //Check if Your Exists
        if (!user) {
            return res.status(404).json({
                emailNotFound: "Email is not registered"
            });
        }

        //Match Password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    //User Matched
                    //Create JWT Payload
                    const payload = {
                        id: user.id,
                        name: user.name
                    };

                    //Sign Token
                    jwt.sign(payload, config.get('secretOrKey'), {
                        expiresIn: 63113852 //2 years in seconds    
                    }, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        });
                    });
                } else {
                    return res.status(400).json({
                        passwordIncorrect: "Password incorrect"
                    });
                }
            });
    });
});


module.exports = Router;


  