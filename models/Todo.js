import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must be provided todo title"],
    maxlength: [20, "name must be less than 20 characters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Must be provided todo description"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Todo", TodoSchema);
