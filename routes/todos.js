import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updatedTodo,
} from "../controllers/todo.js";

const router = express.Router();

//create
router.post("/", createTodo);

//update
router.put("/:id", updatedTodo);

//delete
router.delete("/:id", deleteTodo);

//get
router.get("/:id", getTodo);

export default router;
