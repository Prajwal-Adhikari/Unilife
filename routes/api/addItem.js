const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

const app = express();
app.use(express.json());

const Product = require('../../models/product');

Router.post('/additems',(req,res)=>{
    const newProducts = new Product({
        imagepath : req.body.Imagepath,
        title : req.body.Name,
        productby : req.body.Productby,
        description : req.body.Description,
        price : req.body.Price,
        category : req.body.Category,
    });
    newProducts.save()
    .then(res.send(req.body))
    .catch(err=>console.log(err));
});

module.exports = Router;