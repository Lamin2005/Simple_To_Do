import { Request, Response } from "express";
import Todo from "../models/todolist";

export const create = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const newTodo = await Todo.create({
      title,
    });

    res.json({
      message: "Successfully Created todolist...",
      result: newTodo,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something Wrong in create todo..." });
  }
};

export const delete_todo = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const deleteTodo = await Todo.findByIdAndDelete(id);

    res.json({
      message: "Successfully Delete todolist...",
      result: deleteTodo,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something Wrong in delete todo..." });
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const Todos = await Todo.find();

    res.json({
      message: "Successfully Show todolists...",
      result: Todos,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something Wrong in show todo..." });
  }
};
