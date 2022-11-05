const express = require('express');
const router = express.Router();

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
        country :  req.body.country,
        city : req.body.city,
        address :  req.body.address,
        description : req.body.description,
        contact: req.body.contact,
        price : req.body.price,
        category : req.body.category,
        availability:req.body.availability
    });
    newHostels.save()
    .then(res.send(req.body))
    .catch(err=>console.log(err));
});

module.exports = router;