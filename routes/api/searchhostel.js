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

    
});

module.exports = router;
