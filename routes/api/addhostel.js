const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

const app = express();
app.use(express.json());

const validateAddHostelInput = require('../../validation/addHostel');
const Hostel = require('../../models/hostel');

router.post('/addhostel',(req,res)=>{

    //Form Validation
    //Destructuring Values
    const {
        errors,
        isValid
    } = validateAddHostelInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newHostels = new Hostel({
        imagepath : req.body.imagepath,
        title : req.body.title,
        ownedby : req.body.ownedby,
        latitude :  req.body.latitude,
        longitude : req.body.longitude,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
    });
    newHostels.save()
    .then(res.send(req.body))
    .catch(err=>console.log(err));
});

module.exports = router;