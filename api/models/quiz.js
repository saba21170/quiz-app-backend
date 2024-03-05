const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    questions: [
      {
        question: {
          type: String,
        },
        options: [
          {
            type: String,
          },
        ],
        correctOptionIndex: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
    _id: true,
  }
);

module.exports = mongoose.model("Quiz", quizSchema);
