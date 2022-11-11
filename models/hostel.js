var mongoose = require('mongoose');
var schema = mongoose.Schema;

var hostelSchema = new schema ({
    imagepath : {type : String, required : true},
    ownerid:{type:String,required:true},
    ownedby : {type : String, required:true},
    title : {type: String, required:true},
    city : {type: String, required:true},
    address : {type:String,required:true},
    contact : {type:String,required:true},
    description : {type: String, required:true},
    price : {type: Number, required:true},
    category : {type: String, required:true},
    rating : {type:Number,required:false},
    ratedtimes :{type:Number,required:false},
    availability:{type:String,required:true}
});

module.exports = mongoose.model("hostel", hostelSchema)