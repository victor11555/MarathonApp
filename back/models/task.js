const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    marathon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marathon'
    },
    description: {type: String, required: true},
    solution: {type: String, required: true},
    answers: [{
        student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
        answer: {type: String},
    }],
    feedbacks: [{
        student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
        comment: {type: String},
        points: {type: Number},
    }],
});

module.exports = mongoose.model('Task', taskSchema);
