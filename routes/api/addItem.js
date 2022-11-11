const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

const app = express();
app.use(express.json());

const validateAddProductInput = require('../../validation/addProduct');
const Product = require('../../models/product');
const hiddenProduct = require('../../models/hiddenProduct');
const product = require('../../models/product');

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
            category : req.body.category,
            stock:req.body.stock,
            availability:req.body.availability
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
            stock:req.body.stock,
            availability:req.body.availability
        });
        newProducts.save()
        .then(res.status(200).json("Saved in products"))
        .catch(err=>console.log(err));
    }
});

router.post('/hideproduct',(req,res)=>{
    try{
        //pass hiddenid if hidden otherwise pass itemId from frontend
        if(req.body.hiddenid===undefined){
            if(req.body.availability==="No"||req.body.stock==="0"){
                const saveProduct = new hiddenProduct({
                    imagepath : req.body.imagepath,
                    ownerid:req.body.ownerid,
                    itemId : req.body.itemId,
                    productby : req.body.productby,
                    title : req.body.title,
                    description : req.body.description,
                    price : req.body.price,
                    category : req.body.category,
                    stock: req.body.stock,
                    availability:req.body.availability
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
                    price : req.body.price,
                    category : req.body.category,
                    stock:req.body.stock,
                    availability:req.body.availability
            }})
            .then((r)=>{
                    try{
                        //check this out
                        console.log("in deleting hidden product");
                        hiddenProduct.deleteOne({_id:req.body.hiddenid})
                        .then((res)=>{res.status(200).json("sucessful deleted from hidden product after update")})
                        .catch((e)=>res.status(500).json(e));
                    }catch(e){
                        res.status(500).json(e)
                    }   
            })
            .catch((e)=>{res.status(500).json(e)})
            }
        }
        else{
            if(req.body.itemId===undefined){
                if(req.body.availability==="Yes"&&req.body.stock>0){
                    const product = new Product({
                        imagepath : req.body.imagepath,
                        title : req.body.title,
                        ownerid : req.body.ownerid,
                        productby : req.body.productby,
                        description : req.body.description,
                        price : req.body.price,
                        category : req.body.category,
                        stock:req.body.stock,
                        availability:req.body.availability
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
                        description : req.body.description,
                        price : req.body.price,
                        category : req.body.category,
                        stock: req.body.stock,
                        availability:req.body.availability
                    }},{upsert:true})
                    .then((r)=>res.status(200).json(r))
                    .catch((e)=>res.status(500).json(e))
                }
            }
            else{
                if(req.body.availability==="Yes"&&req.body.stock>0){
                    Product.updateOne({_id:req.body.itemId},{$set:{
                        imagepath : req.body.imagepath,
                        title : req.body.title,
                        ownerid : req.body.ownerid,
                        productby : req.body.productby,
                        description : req.body.description,
                        price : req.body.price,
                        category : req.body.category,
                        stock:req.body.stock,
                        availability:req.body.availability
                    }},{upsert:true})
                    .then((r)=>{
                        hiddenProduct.deleteOne({_id:req.body.hiddenid})
                        .then((r)=>res.status(200).json(r))
                        .catch((e)=>res.status(500).json(e))
                    })
                    .catch((e)=>{res.status(500).json(e)})
            }
            else{
                hiddenProduct.updateOne({_id:req.body.hiddenid},{$set:{
                    imagepath : req.body.imagepath,
                    ownerid:req.body.ownerid,
                    itemId : req.body.itemId,
                    productby : req.body.productby,
                    title : req.body.title,
                    description : req.body.description,
                    price : req.body.price,
                    category : req.body.category,
                    stock: req.body.stock,
                    availability:req.body.availability
                }},{upsert:true})
                .then((foo)=>res.status(200).json(foo))
                .catch((e)=>res.status(500).json(e))
            }
            }
            
        }
    }catch(e){
        res.status(500).json(e)
    }
});

module.exports = router;