const express = require('express');
const router = express.Router();

//Load Input Validation
const validateSearchProductInput = require('../../validation/search_product');
const Product = require('../../models/product');

router.post('/product', async (req, res) => {
	let priceSort;
	try {
        const {
            errors,
            isValid
        } = validateSearchProductInput(req.body);

		if(req.body.price == "High to Low") {
			priceSort = -1;
		} else if(req.body.price == "Low to High") {
			priceSort = 1;
		}

        //Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        let product = await Product.find({
            title: { $regex: req.body.title, $options: "i" },
            // price: {  $gte: req.body.price },
            category: { $regex: req.body.category, $options: "i" },
        }).sort({price: priceSort})

        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.get('/loadproduct',async (req,res)=>{
    const product = await Product.aggregate(
        [{$sample:{size:6}}]
    )
    res.json(product);
});

module.exports = router;
