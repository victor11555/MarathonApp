const router = require('express').Router();
const Marathon = require('../models/marathon');
const Company = require('../models/company')

router
  .route('/')
  .post(async (req, res) => {
    const { title, start, duration, description, timeResponse, deadline, role, timeVideo, channelName, _id } = req.body;
    const user = await Company.findById(_id).populate('marathons');
    // console.log(user);
    const marathon = await new Marathon({
      title, start, duration, description, timeResponse, deadline, timeVideo, channelName
    })
    await marathon.save();
    // console.log(marathon);
    await user.marathons.push(marathon);
    await user.save();
    res.json({ success: true, user }).status(200);
  })

module.exports = router;
