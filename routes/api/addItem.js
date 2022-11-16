const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

const app = express();
app.use(express.json());

const validateAddProductInput = require('../../validation/addProduct');
const Product = require('../../models/product');
const hiddenProduct = require('../../models/hiddenProduct');
const e = require('express');

router.post('/additems',(req,res)=>{

    //Form Validation
    //Destructuring Values
    const {
        errors,
        isValid
    } = validateAddProductInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    if(req.body.availability==="No"||req.body.stock==="0"){
        const hiddenProducts = new hiddenProduct({
            imagepath : req.body.imagepath,
            title : req.body.title,
            ownerid : req.body.ownerid,
            productby : req.body.productby,
            description : req.body.description,
            price : req.body.price,
            rating:0,
            category : req.body.category,
            stock:req.body.stock,
            availability:req.body.availability,
            ratedtimes:0
        });
        hiddenProducts.save()
        .then(res.status(200).json("Saved in hidden products"))
        .catch(err=>console.log(err));
    }
    else{
        const newProducts = new Product({
            imagepath : req.body.imagepath,
            title : req.body.title,
            ownerid : req.body.ownerid,
            productby : req.body.productby,
            description : req.body.description,
            price : req.body.price,
            category : req.body.category,
            rating:0,
            stock:req.body.stock,
            availability:req.body.availability,
            ratedtimes:0
        });
        newProducts.save()
        .then(res.status(200).json("Saved in products"))
        .catch(err=>console.log(err));
    }
});
    
router.post('/updateproduct',(req,res)=>{
    try{
        if(req.body.hiddenid===undefined){
            if(req.body.availability==="No"||req.body.stock==="0"){
                const saveProduct = new hiddenProduct({
                    imagepath : req.body.imagepath,
                    ownerid:req.body.ownerid,
                    itemId : req.body.itemId,
                    productby : req.body.productby,
                    title : req.body.title,
                    rating:req.body.rating,
                    description : req.body.description,
                    price : req.body.price,
                    category : req.body.category,
                    stock: req.body.stock,
                    availability:req.body.availability,
                    ratedtimes:req.body.ratedtimes
                })
                saveProduct.save()
                .then((r)=>{
                    Product.deleteOne({_id:req.body.itemId})
                    .then(()=>res.status(200).json("hidden when changed data"))
                    .catch((e)=>res.status(500).json(e))
                })
                .catch((e)=>res.status(500).json(e))
            }
            else{
                Product.updateOne({_id:req.body.itemId},{$set:{
                    imagepath : req.body.imagepath,
                    title : req.body.title,
                    ownerid : req.body.ownerid,
                    productby : req.body.productby,
                    description : req.body.description,
                    rating:req.body.rating,
                    price : req.body.price,
                    category : req.body.category,
                    stock:req.body.stock,
                    availability:req.body.availability,
                    ratedtimes:req.body.ratedtimes
            }})
            .then((r)=>{
                res.json("deleted product in hidden collection");
            })
            .catch((e)=>{res.status(500).json(e)})
            }
        }
        else{
                if(req.body.availability==="Yes"&&req.body.stock>0){
                    const product = new Product({
                        imagepath : req.body.imagepath,
                        title : req.body.title,
                        ownerid : req.body.ownerid,
                        rating:req.body.rating,
                        productby : req.body.productby,
                        description : req.body.description,
                        price : req.body.price,
                        category : req.body.category,
                        stock:req.body.stock,
                        availability:req.body.availability,
                        ratedtimes:req.body.ratedtimes
                    })
                    product.save()
                    .then(()=>{
                        hiddenProduct.deleteOne({_id:req.body.hiddenid})
                        .then((r)=>res.status(200).json(r))
                        .catch((e)=>res.status(500).json(e))
                    })
                    .catch((e)=>res.status(500).json(e))
                }else{
                    hiddenProduct.updateOne({_id:req.body.hiddenid},{$set:{
                        imagepath : req.body.imagepath,
                        ownerid:req.body.ownerid,
                        productby : req.body.productby,
                        title : req.body.title,
                        rating:req.body.rating,
                        description : req.body.description,
                        price : req.body.price,
                        category : req.body.category,
                        stock: req.body.stock,
                        availability:req.body.availability,
                        ratedtimes:req.body.ratedtimes
                    }})
                    .then((r)=>res.json(r))
                    .catch((e)=>res.json(e))
                } 
        }
    }catch(e){
        res.json(e)
    }
});

router.post('/removeproduct',(req,res)=>{
    console.log("remove product called");
    if(req.body.availability==="Yes"){
        Product.deleteOne({_id:req.body.id})
        .then((r)=>res.json(r))
        .catch(e=>res.json(e))
    }
    else{
        hiddenProduct.deleteOne({_id:req.body.id})
        .then((r)=>res.json(r))
        .catch(e=>res.json(e))
    }
})

module.exports = router;