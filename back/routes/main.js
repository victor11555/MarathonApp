const express = require('express');

const router = express.Router();
const Marathon = require('../models/marathon')

router.get('/', async (req, res, next) => {
    const marathons = await Marathon.find().sort({ start: 1 }).populate()
    // const nowDate = new Date();
    // const nowMarathons = marathons.filter((el) => el.date >= nowDate);
    // res.json(nowMarathons).status(200);
    res.json(marathons).status(200);
})

module.exports = router;
