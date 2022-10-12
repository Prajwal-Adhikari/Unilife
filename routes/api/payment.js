const express = require('express');
const router = express.Router();
const config = require('config');
const Stripe = require("stripe");
const stripe= Stripe(config.get("STRIPE_PRIVATE_KEY"));


const storeItems = new Map([
    [1, { priceInCents : 20000, name : "Bed Table"}],
    [2, { priceInCents : 30000, name : "Table "}],
])

router.post("/create-checkout-session",async(req,res) => {
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode : "payment",
            shipping_address_collection : {
                allowed_countries : ['NP'],
            },
            shipping_options : [
                {
                    shipping_rate_data : {
                        type : 'fixed_amount',
                        fixed_amount : {
                            amount : 0,
                            currency : 'usd',
                        },
                        display_name : 'Free shipping',
                        delivery_estimate : {
                            minimum : {
                                unit : 'day',
                                value : 3,
                            },
                            maximum : {
                                unit : 'day',
                                value : 5,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data : {
                        type : 'fixed_amount',
                        fixed_amount : {
                            amount : 1500,
                            currency : 'usd',
                        },
                        display_name : "Next day air",
                        delivery_estimate : {
                            minimum : {
                                unit:'day',
                                value:1
                            },
                            maximum : {
                                unit : 'day',
                                value : 1,
                            },
                        },
                    },
                },
            ],
            line_items :  req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data : {
                        currency : "usd",
                        product_data : {
                            name : storeItem.name,
                        },
                        unit_amount : storeItem.priceInCents,
                    },
                    quantity:item.quantity,
                }
            }),
            success_url : `${config.get("CLIENT_URL")}/dashboard`,
            cancel_url : `${config.get("CLIENT_URL")}/dashboard`,
        })
        res.json({url:session.url})
    }catch(e) {
        res.status(500).json({error:e.message})
    }
})

module.exports = router;
