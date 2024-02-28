const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        //required: true
    },
    questions: [{
        question: {
            type: String,
           // required: true
        },
        options: [{
            type: String,
            //required: true
        }]
    }],
    // correctAnswers: [{
    //     type: String,
    //     //required: true
    // }]
},
{
    timestamps: true,
    _id: true,
});

module.exports = mongoose.model("Quiz", quizSchema);
