import express from "express";
import {
  createTodo,
  deleteTodo,
  updatedTodo,
  getAllTodo,
} from "../controllers/todo.js";
import { verifyUser } from "../utility/verifyToken.js";

const router = express.Router();

//create
router.post("/", createTodo);

//update
router.put("/:id", verifyUser, updatedTodo);

//delete
router.delete("/:id", verifyUser, deleteTodo);

//get all
router.get("/", verifyUser, getAllTodo);

export default router;
