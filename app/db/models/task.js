import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
});

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;

