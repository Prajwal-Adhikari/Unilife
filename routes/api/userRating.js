const express = require("express");
const router = express.Router();

const Rating = require("../../models/rating");
const Product = require("../../models/product");
const Hostel = require("../../models/hostel");

//to update the rating of items
router.post('/updaterating',(req,res)=>{
    if(req.body.productby!==undefined){
        Product.findOne({_id:req.body.itemId})
        .then((data)=>{
            Product.updateOne({_id:req.body.itemId},{$set:{
                ratedtimes : `${data.ratedtimes+1}`,
                rating:`${(data.rating+req.body.rating)/(data.ratedtimes+1)}`}}
            )
            .then((r)=>res.status(200).json("success"))
            .catch((e)=>res.status(500).json(e))
        })
        .catch((e)=>res.status(500).json(e))
    }else{
        Hostel.findOne({_id:req.body.itemId})
        .then((data)=>{
            Hostel.updateOne({_id:req.body.itemId},{$set:{
                ratedtimes : `${data.ratedtimes+1}`,
                rating:`${(data.rating+req.body.rating)/(data.ratedtimes+1)}`}}
            )
            .then((r)=>res.status(200).json("success"))
            .catch((e)=>res.status(500).json(e))
        })
        .catch((e)=>res.status(500).json(e))
    }
});

//to save rating given by user for particular item
router.post('/saveuserrating',(req,res)=>{
    Rating.updateOne({userid:req.body.id,itemId:req.body.itemId},{$set:{
        userid:req.body.id,
        itemId:req.body.itemId,
        rating:req.body.rating
    }},{upsert:true})
    .then((data)=>res.json(data))
    .catch((e)=>res.status(500).json(e))
});

//to return the rating user had given for particular item
router.post('/userrating',(req,res)=>{
    Rating.findOne({userid:req.body.id,itemId:req.body.itemId})
    .then((data)=>
    {
        res.json(data.rating)
    })
    .catch((e)=>res.status(500).json(e))
});

module.exports=router;