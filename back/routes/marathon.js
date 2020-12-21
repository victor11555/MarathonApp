const router = require('express').Router();
const Marathon = require('../models/marathon');
const Task = require('../models/task')
const Company = require('../models/company')

router
  .route('/')
  .post(async (req, res) => {
    const { title, start, duration, description, timeResponse, deadline, role, timeVideo, channelName, _id } = req.body;
    const user = await Company.findById(_id).populate('marathons');
    const arr =  [];
    for (let i = 0; i < duration; i+= 1) {
        arr.push({day: i+1, task: []});
    }
    const marathon = await new Marathon({
      title, start, duration, description, timeResponse, deadline, timeVideo, channelName, tasks: arr
    })
    await marathon.save();
    // console.log(marathon);
    await user.marathons.push(marathon);
    await user.save();
    res.json({ success: true, user }).status(200);
  })

router.post('/feedback', async (req, res) => {
    console.log(req.body)//zaglushka
})

router.post('/addtask', async (req, res) => {
    const { description, solution, day, marathon} = req.body;
    const task  = new Task({
        description, solution, marathon: marathon._id
    })
    let curMarathon = await Marathon.findOne({_id: marathon._id});
    await task.save();
    curMarathon.tasks[day-1].task.push(task.id);
    await curMarathon.save();
})

module.exports = router;
