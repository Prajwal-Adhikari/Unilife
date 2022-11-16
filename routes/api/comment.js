const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json());

const Comment = require('../../models/comment');

router.post('/addreview', (req, res) => {
	const comment = new Comment({
		itemId: req.body.itemId,
		userId: req.body.userId,
		review: req.body.review
	});
	comment.save((err, doc) => {
		console.log(doc._id);
	});
});

router.post('/getreview', async (req, res) => {
	try {
		let reviews = await Comment.find();
		res.status(200).json(reviews);
	} catch (e) {
		console.log(err);
		res.status(500).json({error: true, message: "Error fetching reviews"});
	}
})

module.exports = router
