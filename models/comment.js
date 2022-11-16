var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	itemId: { type: String, required: true },
	userId: { type: String, required: true },
	review: { type: String, required: true }
});

module.exports = mongoose.model("comment", commentSchema);
