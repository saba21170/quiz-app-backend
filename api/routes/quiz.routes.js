const express = require("express");
const quizRouter = express.Router();
const {addQuiz} = require("../controllers/quiz.controllers")


quizRouter.post("/add",addQuiz);


module.exports = {
    quizRouter,
}