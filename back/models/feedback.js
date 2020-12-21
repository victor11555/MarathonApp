const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    marathon:{type: mongoose.Schema.Types.ObjectId, ref:'Marathon'},
    day: { type: Number, required: true },
    task: { type: Number, required: true },
    comment: { type: String, required: true },
    points: { type: Number, required: true },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
