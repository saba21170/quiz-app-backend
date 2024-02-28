const express = require("express");
const quizRouter = express.Router();
const {addQuiz , getQuizList,getQuizById} = require("../controllers/quiz.controllers")


quizRouter.post("/add",addQuiz);
quizRouter.get("/getAll" ,getQuizList);
quizRouter.get("/getById/:quizId" ,getQuizById);




module.exports = {
    quizRouter,
}