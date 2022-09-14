const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const app = express();
app.use(express.json());

const Product = require('../../models/product');

Router.post('/additems',(req,res)=>{
    const newProducts = new Product({
        imagepath : req.body.imagepath,
        title : req.body.title,
        productby : req.body.productby,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        rating : req.body.rating
    });

    newProducts.save()
    .then(res.send(req.body))
    .catch(err=>console.log(err));
});

module.exports = Router;