import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import todosRoute from "./routes/todos.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("mongodb");
  } catch (error) {
    throw error;
  }
};

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://127.0.0.1:5173",
      "https://comfy-genie-b91d00.netlify.app/",
    ],
  })
);
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/todos", todosRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.listen(process.env.PORT || 8080, () => {
  connect();
  console.log("Server started");
});
