const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    tlg: String,
    marathons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Marathon'}],
    role: {type: String, required: true, default: 'student'},
});

module.exports = mongoose.model('Student', studentSchema);
