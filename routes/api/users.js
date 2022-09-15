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
const DOMAIN = 'sandbox150d8cf6029847779d55cb6e0c4066dd.mailgun.org'; 
const mg = mailgun({apiKey: config.get('MAILGUN_APIKEY'), domain: DOMAIN});

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
        password
       } = req.body;    

        const token = jwt.sign({name,email,password},config.get("JWT_ACC_ACTIVATE"),{expiresIn : '10m'});

        const data = {
        from: 'admin@unilife.com.np',
        to: req.body.email,
        subject: 'Account Activation',
        html : `
            <h2> Please Click on the given link to activate your account.</h2>
            <a><p>${config.get("CLIENT_URL")}/authenication/activation/${token}</p></a>
        `
        }; 
        mg.messages().send(data, function (error, body) {
            if(error){
                return res.json({
                    message : err.message
                });
            }
            console.log(body);
            return res.json({message : "Email has been sent, kindly activate your account"})
            
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

//AccountActivation
Router.post('/activation',(req,res) => {
    const {token} = req.body;
    if(token) {
        jwt.verify(token, config.get("JWT_ACC_ACTIVATE"),function(err,decodedToken){
            if(err){
                return res.status(400).json({error:"Incorrect or expired link"});
            }
            const {name,email,password} = decodedToken;
            User.findOne({
                email: email
            })
            .then(user => {
                if (user) {
                    return res.status(400).json({
                        email: "Email already exists"
                    });
                } else {
                    const newUser = new User({
                        name: name,
                        email: email,
                        password: password
                    });
    
                    //Hash password before saving in database
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => 
                                    {
                                        res.json(user)
                                        res.redirect('/users/dashboard')
                                    }
                                )
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
        });
    }
}
);

module.exports = Router;


  