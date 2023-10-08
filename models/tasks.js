const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    description:{
        type:String,
        // required:true
    },
    date:{
        type:String
    },
    category:{
        type:String
    }
})

const tasks = mongoose.model('tasks',tasksSchema);

module.exports=tasks;