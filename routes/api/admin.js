const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const Product = require('../../models/product');
const Hostel = require('../../models/hostel');
const hiddenHostel = require('../../models/hiddenHostel');
const hiddenProduct = require('../../models/hiddenProduct');


router.post('/searchuser',(req,res)=>{
    if(req.body.remove===true){
    User.findOne({email:req.body.email})
    .then((val)=>{
        if(val===null){
            res.json("negative");
        }
        else{
            User.deleteOne({email:req.body.email})
            .then((data)=>{
                User.findOne({email:req.body.email})
                .then((obj)=>res.json(true))
                .catch((e)=>res.json(false))
            })
            .catch((e)=>res.json(false))
        }
    })
    .catch((e)=>res.status("no")) 
    }
    else{
        User.findOne({email:req.body.email})
        .then((data)=>res.json(data))
        .catch(e=>res.json(e))
    }
});

router.post('/searchhostel',async (req,res)=>{

    if(req.body.remove===true){
        if(req.body.availability==="Yes"){
            Hostel.findOne({_id:req.body.id})
            .then((val)=>{
                if(val===null){
                    res.json("negative");
                }
                else{
                    Hostel.deleteOne({_id:req.body.id})
                    .then((data)=>{
                        Hostel.findOne({_id:req.body.id})
                        .then((obj)=>res.json(true))
                        .catch((e)=>res.json(false))
                })
                .catch((e)=>res.json(false))
            }
        })
        .catch((e)=>res.status("no")) 
        }
        else{
            hiddenHostel.findOne({_id:req.body.id})
            .then((val)=>{
                if(val===null){
                    res.json("negative");
                }
                else{
                    hiddenHostel.deleteOne({_id:req.body.id})
                    .then((data)=>{
                        hiddenHostel.findOne({_id:req.body.id})
                        .then((obj)=>res.json(true))
                        .catch((e)=>res.json(false))
                })
                .catch((e)=>res.json(false))
            }
        })
        .catch((e)=>res.status("no")) 
        }
        }
        else{
            Hostel.findOne({title:{$regex:req.body.title,$options:"i"},address:{$regex:req.body.address,$options:"i"}})
            .then((data)=>{
                if(data===null){
                    hiddenHostel.findOne({title:{$regex:req.body.title,$options:"i"},address:{$regex:req.body.address,$options:"i"}})
                    .then((val=>res.json(val)))
                    .catch(e=>res.json(e))
                }
                else{
                    res.json(data);
                }
            })
            .catch(e=>res.json(e))
        }
});

router.post('/searchproduct',async (req,res)=>{

    if(req.body.remove===true){
        if(req.body.availability==="Yes"&&req.body.stock!==0){
            Product.findOne({_id:req.body.id})
            .then((val)=>{
                if(val===null){
                    res.json("negative");
                }
                else{
                    Product.deleteOne({_id:req.body.id})
                    .then((data)=>{
                        Product.findOne({_id:req.body.id})
                        .then((obj)=>res.json(true))
                        .catch((e)=>res.json(false))
                })
                .catch((e)=>res.json(false))
            }
        })
        .catch((e)=>res.status("no")) 
        }
        else{
            hiddenProduct.findOne({_id:req.body.id})
            .then((val)=>{
                if(val===null){
                    res.json("negative");
                }
                else{
                    hiddenProduct.deleteOne({_id:req.body.id})
                    .then((data)=>{
                        hiddenProduct.findOne({_id:req.body.id})
                        .then((obj)=>res.json(true))
                        .catch((e)=>res.json(false))
                })
                .catch((e)=>res.json(false))
            }
        })
        .catch((e)=>res.status("no")) 
        }
        }
        else{
            Product.findOne({title:{$regex:req.body.title,$options:"i"},productby:{$regex:req.body.productby,$options:"i"}})
            .then((data)=>{
                if(data===null){
                    hiddenProduct.findOne({title:{$regex:req.body.title,$options:"i"},productby:{$regex:req.body.productby,$options:"i"}})
                    .then((val=>res.json(val)))
                    .catch(e=>res.json(e))
                }
                else{
                    res.json(data);
                }
            })
            .catch(e=>res.json(e))
        }
});

module.exports = router;