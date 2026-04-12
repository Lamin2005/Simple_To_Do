import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

const Todo = mongoose.model("todo", todoSchema);
export default Todo;
