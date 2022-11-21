const express = require('express');
const router = express.Router();

const Hostel = require('../../models/hostel');
const Product = require('../../models/product');

router.get('/dashboard',async (req,res)=>{
    try{
        let result = []; 
        const hostel = await Hostel.aggregate(
                [{$sample:{size:6}}]
            )

        const product = await Product.aggregate(
                [{$sample:{size:6}}]
            )
            res.status(200).json(result.concat(hostel,product));

    }catch(err){
        console.log(err);   
        res.status(500).json({error:true,message:"Error in loading data from database"});
    }
});

module.exports = router;