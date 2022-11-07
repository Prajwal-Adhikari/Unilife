var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema ({
    imagepath : {type : String, required : true},
    ownerid:{type:String,required:true},
    productby : {type : String, required:true},
    title : {type: String, required:true},
    description : {type: String, required:true},
    price : {type: Number, required:true},
    category : {type: [String], required:true},
    stock:{type:Number,required:true},
    availability:{type:String,required:true}
});

module.exports = mongoose.model("hiddenProduct", productSchema)