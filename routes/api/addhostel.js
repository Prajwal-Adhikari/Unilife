const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json());

const validateAddHostelInput = require('../../validation/addHostel');
const Hostel = require('../../models/hostel');
const hiddenHostel = require('../../models/hiddenHostel');

/*Working: If id(which is _id of hostel in hostel collection) is passed(in case of changing details), then on the basis availability it adds in 
appropriate collection.If availability is no, it deletes from previous collection and adds in another collection. If _id is not present,it consider as new addition and checks availability for correct collection addition*/
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

    //if new hostel is added
    if(req.body.id===undefined){
        if(req.body.availability==="No"){
            const newHostel = new hiddenHostel({
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
            newHostel.save()
            .then(res.status(200).json("Hostel sucessfully hidden when added first time"))
            .catch(err=>console.log(err));
        }
        
        else{
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
            .then(res.status(200).json("Hostel sucessfully Added"))
            .catch(err=>console.log(err));
        }
    }
    else{
        //if details is being changed
        //if availability is no
        if(req.body.availability==="No"){
            const newHostel = new hiddenHostel({
                id:req.body.id,
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
            newHostel.save()
            .then(
                Hostel.deleteOne({_id:req.body.id})
                .then(res.status(200).json("Hidden Successfully"))
                .catch(res.status(500).json("Can not delete after saving changes in hostel collection"))
            )
            .catch(res.status(500).json("Can not save in hiddenHostel collection after changing availability to No"));
        }
        else{
            //changing details when availability is Yes
            Hostel.updateOne({_id:req.body.id},{$set: {
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
            }})
            .then(res.status(200).json("Sucessfully changed details"))
            // .catch(res.status(500).json("Could not change details"))
        }
    }
});

module.exports = router;