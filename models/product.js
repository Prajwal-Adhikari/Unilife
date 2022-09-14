var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema ({
    imagepath : {type : String, required : true},
    productby : {type : String, required:true},
    title : {type: String, required:true},
    description : {type: String, required:true},
    price : {type: Number, required:true},
    category : {type: [String], required:true},
    rating : {type:Number,required:true}
});

const Product = mongoose.model('Product',schema);
module.exports = Product;

//module.exports = mongoose.model('product',schema);