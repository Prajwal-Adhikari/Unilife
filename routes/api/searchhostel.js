const express = require('express');
const router = express.Router();

//Load Input Validation
const validateSearchHostelInput = require('../../validation/search_hostel');
const Hostel = require('../../models/hostel');

router.post('/hostel',async (req,res)=>{
    try{
        const {
            errors,
            isValid
        } = validateSearchHostelInput(req.body);

         //Check Validation
        if (!isValid) {
        return res.status(400).json(errors);
        }

        let hostel = await Hostel.find({
            city: {$regex: req.body.city, $options: "i"},
            category : {$regex: req.body.category, $options: "i"},
        })

        res.status(200).json(hostel);
    }catch(err){
        console.log(err);   
        res.status(500).json({error:true,message:"Internal Server Error"});
    }
});

module.exports = router;