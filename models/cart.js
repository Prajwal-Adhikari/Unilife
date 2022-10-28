var mongoose = require('mongoose');
var schema = mongoose.Schema;

var addToCartSchema = new schema ({
    id : {type:String,required:true},
    quantity : {type:Number,required:true},
    itemId : {type:String,required:true}
});

module.exports = mongoose.model("cart", addToCartSchema)