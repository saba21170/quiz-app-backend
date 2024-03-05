const Quiz = require("../models/quiz");
const { StatusCodes } = require("http-status-codes");
const Response = require("../models/response");

const addQuiz = async (req, res, next) => {
  try {
    const { title, questions } = req.body;

    const questionsWithCorrectOptionIndex = questions.map((question) => {
      const correctOptionIndex = question.options.indexOf(
        question.correctOption
      );
      return { ...question, correctOptionIndex };
    });

    const quiz = new Quiz({
      title: title,
      questions: questionsWithCorrectOptionIndex,
    });
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
    const quizzes = await Quiz.find().sort({ createdAt: -1 });

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
    });

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

const submitQuiz = async (req, res, next) => {
  try {
    const { quizId, responses } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "FAILED",
        description: "Quiz not found",
      });
    }
    let score = 0;

    quiz.questions.forEach((question) => {
      const questionId = question._id.toString();

      if (responses[questionId] === question.correctOptionIndex) {
        score++;
      }
    });

    const totalQuestions = quiz.questions.length;
    const percentageScore = (score / totalQuestions) * 100;
    const newResponse = new Response({
      quizId: quizId,
      responses: responses,
      score: percentageScore,
    });

    const submitted = await newResponse.save();
    if (submitted) {
      return res.status(StatusCodes.OK).json({
        message: "SUCCESS",
        data: {
          ...submitted.toObject(),
          percentageScore: percentageScore.toFixed(2) + "%",
        },
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "FAILED",
        description: "Quiz not saved",
      });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addQuiz,
  getQuizList,
  getQuizById,
  submitQuiz,
};
