const express = require('express')
const router = express.Router();

const Hostel = require("../../models/hostel");
const hiddenHostel = require("../../models/hiddenHostel");
const Product = require("../../models/product");
const hiddenProduct = require("../../models/hiddenProduct");

router.post('/profileItems',async (req,res)=>{
    const id = req.body.id;

    const listedHostel = await Hostel.find({ownerid:id})
    .then((data)=>{
        return data;
    })
    .catch((e)=>res.status(500).json(e))

    const hidden_hostel = await hiddenHostel.find({ownerid:id})
    .then((data)=>{return data})  
    .catch((e)=>res.status(500).json(e))

    const listedProduct = await Product.find({ownerid:id})
    .then((data)=>{return data})
    .catch((e)=>res.status(500).json(e))

    const hidden_product = await hiddenProduct.find({ownerid:id})
    .then((data)=>{return data})
    .catch((e)=>res.status(500).json(e))

    const list=listedHostel.concat(listedProduct,hidden_hostel,hidden_product);
    res.status(200).json(list);


});

module.exports=router;