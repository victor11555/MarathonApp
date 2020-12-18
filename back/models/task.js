const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    marathon: {type: mongoose.Schema.Types.ObjectId,
        ref:'marathons'},
    description:{type:String, required:true},
    answers:[{
        student: {type: mongoose.Schema.Types.ObjectId, ref: 'students'},
        answer: {type: String},
    }]
});

module.exports = mongoose.model('Task', taskSchema);
