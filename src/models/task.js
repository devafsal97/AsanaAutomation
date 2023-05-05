const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    createdby: {
        type: String,
        required: true
    },
    createdat: {
        type: String,
        required: true
    },
    taskprogress: {
        type: String,
        required: true
    },
    taskcompletedtime: {
        type: String,
        required: false
    },
    turnarroundtime: {
        type: String,
        required: false
    },
    escalationprocess: {
        type: String,
        required: false
    }
},{
    timestamps:true
});

const Task = mongoose.model('Task',taskSchema);
module.exports = Task;