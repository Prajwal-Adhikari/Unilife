const express = require('express');
const router = express.Router();

const Cart = require('../../models/cart');

router.post('/add-to-cart',(req,res)=>{
    console.log("backend called");
    Cart.findOne({
        id : req.body.id,
        itemId : req.body.itemId
    }).then((cartItem)=>{
        //if not found
        if(cartItem===null){
            const newCart = new Cart({
                id:req.body.id,
                quantity:req.body.quantity,
                itemId:req.body.itemId
            });
            newCart.save();
            res.status(200).json(true);
        }
        else{
            //if already added to cart
            Cart.updateOne({item:req.body.item,itemId:req.body.itemId},{$set: {quantity:req.body.quantity}})
            .then((cartItem)=>{
                res.status(200).json(true);
            }).catch((error)=>{
                res.status(500).json(error);          
            })
        }
    }).catch((err)=>{
        res.status(500).json(err);
    })
});


router.post('/product',(req,res)=>{

});

module.exports = router;
