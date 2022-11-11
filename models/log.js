var mongoose = require('mongoose');
var schema = mongoose.Schema;

var LogSchema = new schema ({
    userid : {type:String,required:true},
    quantity : {type:Number,required:true},
    imagepath : {type:String,required:true},
    totalprice : {type:Number,required:true},
    title:{type:String,required:true},
    date: {type: Date,default: Date.now},
});

module.exports = mongoose.model("log", LogSchema)