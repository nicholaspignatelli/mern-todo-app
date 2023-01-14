const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Task = new Schema({
    description: {
        type: String
    },
    assignee: {
        type: String
    },
    priority: {
        type: String
    },
    isComplete: {
        type: Boolean
    }
});

module.exports = mongoose.model('Task', Task);