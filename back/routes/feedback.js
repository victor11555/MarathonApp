const express = require('express');

const router = express.Router();
const Feedback = require('../models/feedback')

router.get('/', async (req, res, next) => {
    const feedbacks = await Feedback.find();
    res.json({success: true, feedbacks}).status(200);
})

module.exports = router;
