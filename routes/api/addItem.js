const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

const app = express();
app.use(express.json());

const validateAddProductInput = require('../../validation/addProduct');
const Product = require('../../models/product');

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

    const newProducts = new Product({
        imagepath : req.body.imagepath,
        title : req.body.title,
        ownerid : req.body.ownerid,
        productby : req.body.productby,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        stock:req.body.stock
    });
    newProducts.save()
    .then(res.send(req.body))
    .catch(err=>console.log(err));
});

module.exports = router;