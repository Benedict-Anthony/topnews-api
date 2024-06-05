import express, { Express } from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/dbInit";
import userRouter from "./routes/user.routes";
import errorHandler from "./middleware/errorMiddleware";
import morgan = require("morgan");
import blogRouter from "./routes/blog.routes";
dotenv.config();

// initialize app

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to database
connectDB();
app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to blog application API " });
});

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(colors.blue.bold(`Server start on port ${PORT}`))
);
