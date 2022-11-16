const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const Product = require('../../models/product');
const Hostel = require('../../models/hostel');
const hiddenHostel = require('../../models/hiddenHostel');
const hiddenProduct = require('../../models/hiddenProduct');


router.post('/searchuser',(req,res)=>{
    User.findOne({email:req.body.email})
    .then((val)=>{
        User.deleteOne({email:req.body.email})
        .then((data)=>{
            User.findOne({email:req.body.email})
            .then((obj)=>res.json(true))
            .catch((e)=>res.json(false))
        })
        .catch((e)=>res.json(false))
    })
    .catch((e)=>res.status("no")) 
});

router.post('/searchhostel',async (req,res)=>{
    let collection = [];
    const hostels = await Hostel.find({title:{$regex:req.body.title,$options:"i"}})
    .then((data)=>{return data})
    .catch((e)=>res.json(e))

    const hiddenhostels = await hiddenHostel.find({title:{$regex:req.body.title,$options:"i"}})
    .then((data)=>{return data})
    .catch((e)=>res.json(e))

    collection = hostels.concat(hiddenhostels);
    res.json(collection);
});

router.post('/searchproduct',async (req,res)=>{
    let collection = [];
    const products = await Product.find({title:{$regex:req.body.title,$options:"i"}})
    .then((data)=>{return data})
    .catch((e)=>res.json(e))

    const hiddenproducts = await hiddenProduct.find({title:{$regex:req.body.title,$options:"i"}})
    .then((data)=>{return data})
    .catch((e)=>res.json(e))

    collection = products.concat(hiddenproducts);
    res.json(collection);
});

router.post('/deleteuser',(req,res)=>{
    User.deleteOne({_id:req.body.userid})
    .then((r)=>res.json(true))
    .catch((e)=>res.json(e))
});

router.post('/deletehostel',(req,res)=>{
    if(req.body.availibility==="Yes"){
        Hostel.deleteOne({_id:req.body.userid})
        .then((r)=>res.json(true))
        .catch((e)=>res.json(e))
    }
    else{
        hiddenHostel.deleteOne({_id:req.body.userid})
        .then((r)=>res.json(true))
        .catch((e)=>res.json(e))
    }  
});

router.post('/deleteproduct',(req,res)=>{
    if(req.body.availibility==="Yes"&&req.body.stock!=="0"){
        Product.deleteOne({_id:req.body.userid})
        .then((r)=>res.json(true))
        .catch((e)=>res.json(e))
    }
    else{
        hiddenProduct.deleteOne({_id:req.body.userid})
        .then((r)=>res.json(true))
        .catch((e)=>res.json(e))
    }
});

module.exports = router;