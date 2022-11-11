var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ratingSchema = new schema ({
    userid : {type:String,required:true},
    itemId : {type:String,required:true},
    rating : {type:Number,required:true},
});

module.exports = mongoose.model("rating", ratingSchema)