const router = require('express').Router();
const Marathon = require('../models/marathon');
const Task = require('../models/task');
const Company = require('../models/company');
const Student = require('../models/student');

router
  .route('/')
  .post(async (req, res) => {
    const { company, title, start, duration, description, timeResponse, deadline, role, timeVideo, channelName, _id } = req.body;
    const user = await Company.findById(_id).populate('marathons');
    const arr = [];
    for (let i = 0; i < duration; i += 1) {
      arr.push({ day: i + 1, task: [] });
    }
    const marathon = await new Marathon({
      company, title, start, duration, description, timeResponse, deadline, timeVideo, channelName, tasks: arr
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
    const { description, solution, day, marathon, userId} = req.body;
    const task  = new Task({
        description, solution, marathon: marathon._id
    })
    let curMarathon = await Marathon.findOne({_id: marathon._id}).populate('tasks.task');
    await task.save();
    curMarathon.tasks[day-1].task.push(task.id);
    await curMarathon.save();
    const user = await Company.findById(userId).populate({path: 'marathons', populate:{path: 'tasks', populate:{path: 'task'}}});
    await user.save();
    res.json({success: true, user})
})
  router.post('/participate', async (req, res) => {
  const { user, id } = req.body;
  const student = await Student.findById(user).populate({path: 'marathons', populate:{path: 'tasks', populate:{path: 'task'}}});
  const marathon = await Marathon.findById(id);
  student.marathons.push(marathon);
  await student.save();
  res.json({ success: true, student }).status(200);
})

module.exports = router;
