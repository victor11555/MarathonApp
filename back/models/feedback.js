const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    marathon: {type: mongoose.Schema.Types.ObjectId, ref: 'Marathon', required: true},
    task: {type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true},
    day: {type: Number, required: true},
    taskNumb: {type: Number, required: true},
    comment: {type: String, required: true},
    points: {type: Number, required: true},
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
});

module.exports = mongoose.model('Feedback', feedbackSchema);
