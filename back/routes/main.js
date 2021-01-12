const express = require('express');

const router = express.Router();
const Marathon = require('../models/marathon')

router.get('/', async (req, res, next) => {
    const marathons = await Marathon.find().sort({start: 1}).populate({
        path: 'tasks',
        populate: {path: 'task', populate: {path: 'answers feedbacks'}}
    })
    const nowDate = new Date();
    const nowMarathons = marathons.filter((el) => el.start >= nowDate);
    res.json({success: true, nowMarathons}).status(200);
})

module.exports = router;
