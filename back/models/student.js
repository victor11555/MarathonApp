const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    tlg: {type: String, required: true},
    marathons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Marathon'}],
    role: {type: String, required: true, default: 'student'},
    points: {type: Number, default: 0},
});

module.exports = mongoose.model('Student', studentSchema);
