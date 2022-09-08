const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const stripe = require("stripe")("pk_test_51LfgqMDq9ZxoxTz0fbLtR0B9Z6ocBmpnc4Q9xypOEbwRmGtF3EliHKSIMzcKEj9m8kBUPt9amYcsklFlQEhe934o00ArMcTlf8");
const uuid = require("uuid/v4");
const cors = require("cors");


const app = express();
app.use(expres.json());
app.use(cors());

app.get("/payment",(req,res)=>{
    res.send("currently on the payment page");
    console.log("payment working");
});

app.post("/payment",(req,res)=>{
    const {product,token} = req.body;
    console.log("Product" , product);
    console.log("Price",product.price);
    const idempotencyKey = uuid();

    return stripe .customers.create({
        email:token.email,
        source:token.id
    }).then(customer =>{
        stripe.charges.create({
            amount : product.price*100,
            cuurency:"usd",
            customer:customer.id,
            receipt_email:token.email,
            description: `purchase of product.name`,
            shipping :{
                name : token.card.name,
                address : {
                    country : token.card.address_country
                }
            }
        },{idempotencyKey})
    })
    .then(result=>res.status(200).json(result))
    .catch(err=>console.log(err))
})

module.exports = app;
