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
    ratedtimes :{type:Number,required:false},
    rating : {type:Number,required:false},
    availability:{type:String,required:true}
});

// const Product = mongoose.model('Product',schema);
// module.exports = Product;

module.exports = mongoose.model("product", productSchema)