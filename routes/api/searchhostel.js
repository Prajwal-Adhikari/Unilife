const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

//Load Input Validation
const validateSearchHostelInput = require('../../validation/search_hostel');
const Hostel = require('../../models/hostel');

router.post('/hostel',async (req,res)=>{
    try{
        console.log(req.body);
        const {
            errors,
            isValid
        } = validateSearchHostelInput(req.body);
    
        //Check Validation
        // if (!isValid){
        //     return res.status(400).json(errors);
        // }
    
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "price";
        let category = req.query.category || "All";

        // const categoryOptions = [
        //                req.body.country,
        //                req.body.city,
        //                req.body.category
        //             ]

        const categoryOptions = [
            "Nepal",
            "Dhulikhel",
            "Boys"
         ]

        category === "All"
            ? (category = [...categoryOptions])
            : (category = req.query.category.split(","));
        
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy = {};
        if(sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const hostel = await Hostel.find({title: {$regex: search, $options: "i"}})
            .where("category")
            .in([...category])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);

        // const total = await Hostel.countDocuments({
        //     category: {$in: [...category]},
        //     title: { $regex: search, $options: "i"},
        // });

       // const response = {
            // error: false,
            // total,
            // page: page + 1,
            // limit,
            // categories: categoryOptions,
         //   hostel
        //} 
        console.log("From Hostel : " + hostel);
        res.send(hostel);
        //res.status(200).json(hostel);
    }catch(err){
        console.log(err);   
        res.status(500).json({error:true,message:"Internal Server Error"});
    }
});

module.exports = router;