const express = require('express');
const router = express.Router();

const Cart = require('../../models/cart');
const Product = require('../../models/product');
const hiddenProduct = require('../../models/hiddenProduct');

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
                ownerid : req.body.id,
                title:req.body.title,
                imagepath :req.body.imagepath,
                productby : req.body.productby,
                stock: req.body.stock,
            });
            newCart.save();
            res.status(200).json(true);
        }
        //if found
        else{
            res.status(200).json("exists")
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

router.post('/save-cart',(req,res)=>{
    const arr = req.body.items;
    try{
        arr.map((item)=>{
            if(req.body.buy===true){
                try{
                    Cart.updateOne({itemId:item._id,id:req.body.id},{$set:{
                        buy : true,
                        id:req.body.id,
                        quantity:req.body.quantity,
                        itemId:item._id,
                        price:item.price,
                        ownerid : item.ownerid,
                        title:item.title,
                        imagepath :item.imagepath,
                        productby : item.productby,
                        stock: item.stock,
                    }},{upsert:true}).then()
                    .catch((e)=>{throw e})
                }catch(e){
                    res.status(500).json(e)
                }
            }
            else{
                Cart.updateOne({_id:item._id},{$set:{
                    quantity:item.quantity,
                    buycart:true
                }}).then()
                .catch((e)=>{res.status(e)})
            }
        })
    }catch(e){
        res.json(e);
    }
});

router.post('/remove',async (req,res)=>{
    const obj = req.body.items;
    try{
        obj.map((item)=>{
            //search product to change stock
            Product.findOne({_id:item.itemId})
            .then((data)=>{
                const num = data.stock;
                //change the stock of the product
                Product.updateOne({_id:item.itemId},{$set:{
                    stock:`${num-item.quantity}`
                }}).then((_data)=>{
                    //search for the product again to check whether the stock is zero or not
                    Product.findOne({_id:item.itemId})
                    .then((value)=>{
                        if(value.stock===0){
                            //remember to remove item from cart when removed by owner
                            //hiding item when quantity is zero
                            //add this below : ownerid:value.ownerid,
                            hiddenProduct.updateOne({itemId:value._id},{$set:{
                                imagepath : value.imagepath,
                                itemId : value.itemId,
                                productby : value.productby,
                                title : value.title,
                                description : value.description,
                                price : value.price,
                                category : value.category,
                                stock:value.stock,
                                availability:"No",
                            }},{upsert:true})
                            .then((oof)=>{
                                //deleting the product from product collection 
                                Product.deleteOne({_id:value._id})
                                .then((removed)=>{
                                    res.status(200).json("worked")
                                })
                                .catch((e)=>res.status(500).json(e))
                            })
                            .catch((e)=>{
                                res.status(500).json(e)
                            })
                        }
                    })
                    .catch((e)=>{
                        res.status(500).json(e);
                    })
                })
            })
            .catch((e)=>res.status(500).json(e))
        })
    }catch(e){
        res.json(e);
    }
    try{
        Cart.deleteMany({id:req.body.id,$or:[{buy:true},{buycart:true}]})
        .then((resp)=>{
            res.status(200).json("Succesfully deleted");
        })
        .catch((e)=>{
            res.status(500).json(e);
        })
    }catch(e){
        res.status(500).json(e)
    }
})

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

router.post('/load-checkout',(req,res)=>{
    try{
        Cart.find({ 
            id:req.body.id,
            $or : [{buy:true},{buycart:true}]
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
