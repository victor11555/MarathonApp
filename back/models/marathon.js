const mongoose = require('mongoose');

const marathonSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  start: Date,
  duration: Number,
  timeAppearanceTask: Number,
  timeResponse: Number,
  timePublicationDecisions: Number,
  description:{ type: String, unique: true, required: true },
  tasks:[[{type: mongoose.Schema.Types.ObjectId,
    ref:'tasks'}]],
  channelName: String,
});

module.exports = mongoose.model('Marathon', marathonSchema);
