var mongoose = require('mongoose');
const { stringify } = require('uuid');
var Schema = mongoose.Schema;

var schema = new Schema({
    user : { type : Schema.Types.ObjectId, ref : 'User'},
    cart : {type : Object, required : true},
    name : {type: String, required : true},
    paymentId : {type: string, required: true} 
})
 