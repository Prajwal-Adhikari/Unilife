var mongoose = require('mongoose');
var schema = mongoose.Schema;

var hostelSchema = new schema ({
    imagepath : {type : String, required : true},
    ownedby : {type : String, required:true},
    title : {type: String, required:true},
    longitude : {type: String, required:true},
    latitude : {type: String, required:true},
    description : {type: String, required:true},
    price : {type: Number, required:true},
    category : {type: String, required:true},
});

module.exports = mongoose.model("hostel", hostelSchema)