const mongoose = require('mongoose');

const marathonSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  start: Date,
  duration: Number,
  timeResponse: String,
  deadline: String,
  timeVideo: String,
  description:{ type: String, unique: true, required: true },
  tasks:[[{type: mongoose.Schema.Types.ObjectId,
    ref:'tasks'}]],
  channelName: String,
});

module.exports = mongoose.model('MarathonAddTask', marathonSchema);
