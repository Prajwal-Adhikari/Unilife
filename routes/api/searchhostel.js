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

        // const page = parseInt(req.query.page) - 1 || 0;
        // const limit = parseInt(req.query.limit) || 5;
        // const search = req.query.search || "";
        // let sort = req.query.sort || "price";
        // let category = req.query.category || "All";

        // const categoryOptions = [
        //                req.body.country,
        //                req.body.city,
        //                req.body.category
        //             ]

        // category === "All"
        //     ? (category = [...categoryOptions])
        //     : (category = req.query.category.split(","));

        // req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        // let sortBy = {};
        // if(sort[1]) {
        //     sortBy[sort[0]] = sort[1];
        // } else {
        //     sortBy[sort[0]] = "asc";
        // }

        let hostel = await Hostel.find({
            country: {$regex: req.body.country, $options: "i"},
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