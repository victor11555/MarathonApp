const mongoose = require('mongoose');

const marathonSchema = new mongoose.Schema({
    title: {type: String, required: true},
    start: {type: Date, required: true},
    duration: {type: Number, required: true},
    timeResponse: {type: String, required: true},
    deadline: {type: String, required: true},
    timeVideo: {type: String, required: true},
    description: {type: String, required: true},
    tasks: [{
        day: Number,
        task: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    }],
    company: {type: String, required: true},
    channelName: {type: String, required: true},
});

module.exports = mongoose.model('Marathon', marathonSchema);
