const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({

    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        //required: true
    },
    responses: {
        type: Map,
        of: Number,
        //required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Response", responseSchema);
