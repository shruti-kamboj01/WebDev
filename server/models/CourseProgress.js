const mongoose = require("mongoose");
// mongoose.set('bufferCommands', false);
// mongoose.set('autoCreate',false);

const courseProgress = new mongoose.Schema({
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
    completedVideo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
    }]
    
});

module.exports = mongoose.model("CourseProgress", courseProgress);