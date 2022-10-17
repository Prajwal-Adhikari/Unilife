const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

//Load Input Validation
const validateSearchHostelInput = require('../../validation/search_hostel');
const Hostel = require('../../models/hostel');

router.post('/searchhostel',(req,res)=>{
    const {
        errors,
        isValid
    } = validateSearchHostelInput(req.body);

    //Check Validation
    if (!isValid){
        return res.status(400).json(errors);
    }

    Hostel.findById("6349912ef78fd417574888bd").then(user=>{
        console.log(user);
    }).catch((err)=>{
        console.log(err);
    }
    )
    
});

module.exports = router;
