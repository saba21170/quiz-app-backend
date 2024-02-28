const express = require("express");
const {quizRouter} = require("./api/routes/quiz.routes")
const cors = require("cors");

const connectDB = require("./dependencies/connectDb");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
const port = process.env.PORT;
connectDB();

app.use("/quiz" , quizRouter)




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
