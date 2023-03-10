import Todo from "../models/Todo.js";

export const createTodo = async (req, res, next) => {
  const newTodo = new Todo(req.body);
  try {
    const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (err) {
    next(err);
  }
};

export const updatedTodo = async (req, res, next) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json("Todo deleted.");
  } catch (err) {
    next(err);
  }
};

export const getAllTodo = async (req, res, next) => {
  try {
    const query = { createdBy: req.headers.username };
    const todo = await Todo.find(query).sort({ completed: 1, createdAt: -1 });
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};
