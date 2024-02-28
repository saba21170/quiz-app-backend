const Quiz = require("../models/quiz");
const { StatusCodes } = require("http-status-codes");

const addQuiz = async (req, res, next) => {
  try {
    const payloads = req.body;

    const quiz = new Quiz(payloads);
    const savedQuiz = await quiz.save();
    if (savedQuiz) {
      return res.status(StatusCodes.OK).json({
        message: "SUCCESS",
        data: savedQuiz,
        status: true,
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "FAILED",
        description: "Quiz not saved",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "SORRY: Something went wrong",
      error: error.message,
      status: false,
    });
  }
};

const getQuizList = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find();
    
    if (quizzes.length > 0) {
      return res.status(StatusCodes.OK).json({
        message: "SUCCESS",
        data: quizzes,
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "FAILED",
        description: "No quiz  found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "SORRY: Something went wrong",
      error: error.message,
    });
  }
};


const getQuizById = async (req, res, next) => {
  try {

    const { quizId } = req.params;
    const quiz = await Quiz.findById({
      _id: quizId,
  
    })
    
    if (quiz) {
      return res.status(StatusCodes.OK).json({
        message: "SUCCESS",
        data: quiz,
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "FAILED",
        description: "No quiz  found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "SORRY: Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  addQuiz,
  getQuizList,
  getQuizById
};
