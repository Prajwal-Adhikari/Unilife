// const router = require("express").Router();
// const Product = require("../../models/product");
// //const products = require("../../config/products.json");

// router.post("/product", async(req, res) => {
//     try{
//         const page = parseInt(req.query.page) - 1 || 0;
//         const limit = parseInt(req.query.limit) || 5;
//         const search = req.query.search || "";
//         let sort = req.query.sort || "price";
//         let category = req.query.category || "All";

//         // const categoryOptions = [
//         //     "Furniture",
//         //     "Education",
//         //     "Utensil",
//         //     "Others"
//         // ]

//         const categoryOptions = [
//            // req.body.category,
//             //req.body.productby,
//             req.body.title,
//         ]

//         category === "All"
//             ? (category = [...categoryOptions])
//             : (category = req.query.category.split(","));
        
//         req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

//         let sortBy = {};
//         if(sort[1]) {
//             sortBy[sort[0]] = sort[1];
//         } else {
//             sortBy[sort[0]] = "asc";
//         }

//         const products = await Product.find({title: {$regex: search, $options: "i"}})
//             .where("category")
//             .in([...category])
//             .sort(sortBy)
//             .skip(page * limit)
//             .limit(limit);

//         //const total = await Product.countDocuments({
//         //     category: {$in: [...category]},
//         //     title: { $regex: search, $options: "i"},
//         // });

//         // const response = {
//         //     error: false,
//         //     total,
//         //     page: page + 1,
//         //     limit,
//         //     categories: categoryOptions,
//         //     products,
//         // }

//         res.status(200).json(products);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({error: true, message:"Internal Server Error"});
//     }
// });

// // const insertProducts = async() => {
// //     try {
// //         const docs = await Product.insertMany(products);
// //         return Promise.resolve(docs);
// //     } catch (err) {
// //         return Promise.reject(err);
// //     }
// // }

// // insertProducts()
// //     .then((docs) => console.log(docs))
// //     .catch((err) => console.log(err))

// module.exports = router;

/* ------------------------------------------------------------------------------------------- */
const express = require('express');
const router = express.Router();

//Load Input Validation
const validateSearchProductInput = require('../../validation/search_product');
const Product = require('../../models/product');

router.post('/product', async (req, res) => {
    try {
        const {
            errors,
            isValid
        } = validateSearchProductInput(req.body);

        //Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        let product = await Product.find({
            title: { $regex: req.body.title, $options: "i" },
            price: {  $gte: req.body.price },
            category: { $regex: req.body.category, $options: "i" },
        })

        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

module.exports = router;