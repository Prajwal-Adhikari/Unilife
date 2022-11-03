const express = require('express');
const router = express.Router();

const Cart = require('../../models/cart');

router.post('/add-to-cart',(req,res)=>{
    Cart.findOne({
        id : req.body.id,
        itemId : req.body.itemId
    }).then((cartItem)=>{
        //if not found
        if(cartItem===null){
            const newCart = new Cart({
                id:req.body.id,
                quantity:req.body.quantity,
                itemId:req.body.itemId,
                price:req.body.price,
                title:req.body.title,
                imagepath :req.body.imagepath,
                productby : req.body.productby,
                stock: req.body.stock,
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


router.post('/remove-from-cart',(req,res)=>{
    try{
        Cart.deleteOne({ 
            _id:req.body._id
          })
          .then(()=>{ 
            try{
            Cart.find({ 
                id:req.body.id
              })
              .then((info)=>{
                res.status(200).json(info)
              }).catch((err)=>{
                  res.status(500).json("Can not find the given id in cart db "+ err);
              })
        }catch(err){
            res.status(500).json(err);
        }
        }).catch((err)=>{
              res.status(500).json("Can not find the given id in cart db "+ err);
          })
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/load-cart',(req,res)=>{
    try{
        Cart.find({ 
            id:req.body.id
          })
          .then((info)=>{
            res.status(200).json(info)
          }).catch((err)=>{
              res.status(500).json("Can not find the given id in cart db "+ err);
          })
    }catch(err){
        res.status(500).json(err);
    }
});




module.exports = router;
