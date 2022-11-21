const express = require('express')
const router = express.Router();

const Hostel = require("../../models/hostel");
const hiddenHostel = require("../../models/hiddenHostel");
const Product = require("../../models/product");
const hiddenProduct = require("../../models/hiddenProduct");
const logs = require("../../models/log");

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

router.post('/logs',(req,res)=>{
    logs.findOne({userid:req.body.id})
    .then((obj)=>{res.status(200).json(obj)})
    .catch((e)=>res.status(500).json(e))
});

router.post('/updatelog',(req,res)=>{
    const obj = req.body.items;
    obj.map((elem)=>{
        const data = new logs({
            userid : elem.id,
            quantity : elem.quantity,
            imagepath : elem.imagepath,
            totalprice : `${elem.price*elem.quantity}`,
            title:elem.title,
        })
        data.save()
        .then()
        .catch((e)=>res.status(500).json(e))
    })
})

module.exports=router;