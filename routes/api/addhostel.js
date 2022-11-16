const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json());

const validateAddHostelInput = require('../../validation/addHostel');
const Hostel = require('../../models/hostel');
const hiddenHostel = require('../../models/hiddenHostel');

/*Working: If id(which is _id of hostel in hostel collection) is passed(in case of changing details), then on the basis availability it adds in 
appropriate collection.If availability is no, it deletes from previous collection and adds in another collection. If _id is not present,it consider as new addition and checks availability for correct collection addition. If remove is passed in availability, then it removes the details of hostel.*/
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

        //new hostel in hiddenHostel collection
        if(req.body.availability==="No"){
            const newHostel = new hiddenHostel({
                imagepath : req.body.imagepath,
                title : req.body.title,
                ownedby : req.body.ownedby,
                ownerid:req.body.ownerid,
                city : req.body.city,
                address :  req.body.address,
                description : req.body.description,
                contact: req.body.contact,
                price : req.body.price,
                category : req.body.category,
                availability:req.body.availability,
                ratedtimes:0,
                rating:0,
                report:0
            });
            newHostel.save()
            .then(res.json("Hostel sucessfully hidden when added first time"))
            .catch(err=>console.log(err));
        }
        //new hostel in hostel collection
        else{
            const newHostels = new Hostel({
                imagepath : req.body.imagepath,
                title : req.body.title,
                ownedby : req.body.ownedby,
                ownerid:req.body.ownerid,
                city : req.body.city,
                address :  req.body.address,
                description : req.body.description,
                contact: req.body.contact,
                price : req.body.price,
                category : req.body.category,
                availability:req.body.availability,
                ratedtimes:0,
                rating:0,
                report:0
            });
            newHostels.save()
            .then(res.json("Hostel sucessfully Added"))
            .catch(err=>console.log(err));
        }
    
        //if details is being changed
        //when user wants to remove the hostel
        //remove should be passed from the frontend with value either true or false
});

router.post("/updatehostel",(req,res)=>{

    if(req.body.remove){
        if(req.body.availability==="Yes"){
            Hostel.deleteOne({_id:req.body.id})
            .then(res.json("Successfully removed hostel (availability:Yes)"))
            .catch(res.json("Can not remove hostel (availability:Yes)"))
        }
        else{
            hiddenHostel.deleteOne({_id:req.body.id})
            .then(res.json("Successfully removed hostel (availability:No)"))
            .catch(res.json("Can not remove hostel (availability:No)"))
        }
    }
    //not removing
    else{
        //if availability is no
    if(req.body.availability==="No"){
            //hiddenid is the _id in the hidden collection
            //checking from which collection is the request comming from
            if(req.body.hiddenid===undefined){
                try{
                    hiddenHostel.updateOne({_id:req.body.id},{$set : {
                        id:req.body.id,
                        imagepath : req.body.imagepath,
                        title : req.body.title,
                        ownedby : req.body.ownedby,
                        city : req.body.city,   
                        ownerid:req.body.ownerid,
                        address :  req.body.address,    
                        description : req.body.description,
                        contact: req.body.contact,
                        price : req.body.price,
                        category : req.body.category,
                        rating:req.body.rating,
                        availability:req.body.availability,
                        ratedtimes:req.body.ratedtimes,
                        report : req.body.report
                    }},{upsert:true})
                    .then(
                        Hostel.deleteOne({_id:req.body.id})
                        .then(
                            res.json("data"))
                        .catch((e)=>{res.json("Can not delete (second last)")})
    
                    )
                    .catch(
                        res.json("can not delete (after second last)")
                    )
                }catch(e){
                    res.json(e)
                }
            }
            else{
                try{
                    hiddenHostel.updateOne({_id:req.body.hiddenid},{$set :{
                        imagepath : req.body.imagepath,
                        title : req.body.title,
                        ownedby : req.body.ownedby,
                        ownerid:req.body.ownerid,
                        city : req.body.city,
                        address :  req.body.address,
                        description : req.body.description,
                        contact: req.body.contact,
                        price : req.body.price,
                        category : req.body.category,
                        availability:req.body.availability,
                        ratedtimes:req.body.ratedtimes,
                        rating:req.body.rating,
                        report : req.body.report
                    }},{upsert:true})
                    .then(
                        res.json("updated changes in hidden hostel collection")
                    )
                    .catch(res.json("Can not save in hiddenHostel collection when availability to No"));
                }catch(e){
                    res.json(e)
                }
            }
        
    }
    else{
        if(req.body.hiddenid===undefined){
            try{
            //changing details when availability is Yes
            Hostel.updateOne({_id:req.body.id},{$set : {
                imagepath : req.body.imagepath,
                title : req.body.title,
                ownedby : req.body.ownedby,
                ownerid:req.body.ownerid,
                city : req.body.city,   
                address :  req.body.address,
                description : req.body.description,
                contact: req.body.contact,
                price : req.body.price,
                category : req.body.category,
                availability:req.body.availability,
                rating:req.body.rating,
                ratedtimes:req.body.ratedtimes,
                report : req.body.report
            }},{upsert:true})
            .then((eve)=>res.json(eve))
            }catch(e){
                res.json(e)
            }
        }
        else{
            Hostel.updateOne({_id:req.body.hiddenid},{$set:{
                imagepath : req.body.imagepath,
                title : req.body.title,
                ownedby : req.body.ownedby,
                ownerid:req.body.ownerid,
                city : req.body.city,   
                address :  req.body.address,
                description : req.body.description,
                contact: req.body.contact,
                price : req.body.price,
                category : req.body.category,
                availability:req.body.availability,
                rating:req.body.rating,
                ratedtimes:req.body.ratedtimes,
                report : req.body.report
            }},{upsert:true})
            .then((eve)=>{
                hiddenHostel.deleteOne({_id:req.body.hiddenid})
                .then((data)=>{
                    res.json(data)
                })
                .catch((e)=>res.json(e))
            })
            .catch((e)=>res.json(e))
        }
    }
    }
});

module.exports = router;
