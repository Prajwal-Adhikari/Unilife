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
            Cart.updateOne({_id:item._id},{$set:{
                quantity:item.quantity
            }}).then()
            .catch((e)=>{res.status(e)})
        })
    }catch(e){
        res.json(e);
    }
});

router.post('/remove',async (req,res)=>{
    console.log("remove");
    const obj = req.body.items;
    try{
        console.log("I");
        console.log(req.body.items);
        obj.map((item)=>{
            //search product to change stock
            Product.findOne({_id:item.itemId})
            .then((data)=>{
                console.log("II");
                const num = data.stock;
                console.log(num);
                console.log(`${num-item.quantity}`);
                //change the stock of the product
                Product.updateOne({_id:item.itemId},{$set:{
                    stock:`${num-item.quantity}`
                }}).then((_data)=>{
                    console.log("III");
                    //search for the product again to check whether the stock is zero or not
                    Product.findOne({_id:item.itemId})
                    .then((value)=>{
                        if(value.stock===0){
                            console.log("IV");
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
                                console.log("V");
                                //deleting the product from product collection 
                                Product.deleteOne({_id:value._id})
                                .then((removed)=>{
                                    console.log("VI");
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
        Cart.deleteMany({id:req.body.id})
        .then((resp)=>{
            console.log("Succesfully deleted");
            //res.status(200).json("Succesfully deleted");
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

//to add in hiddenProduct collection
router.post('/hiddenProduct',(req,res)=>{
    const obj = new hiddenProduct({
        imagepath : req.body.imagepath,
        ownerid:req.body.ownerid,
        itemId : req.body.itemId,
        productby : req.body.productby,
        title : req.body.title,
        description : req.body.description,
        price :req.body.price,
        category : req.body.category,
        stock:req.body.stock,
        availability:req.body.availability
    })
    obj.save()
    .then((data)=>res.status(200).json(data))
    .catch((e)=>res.json(e))
})


module.exports = router;
