import { Request, Response } from "express";
import Todo from "../models/todolist";

export const create = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
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
  const { id } = req.body;
  try {
    const deleteTodo = await Todo.findByIdAndDelete(id);

    if (!deleteTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

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

export const readdetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const Todos = await Todo.findById(id);

    if (!Todos) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({
      message: "Successfully Show Dtail todolists...",
      result: Todos,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something Wrong in show todo detail..." });
  }
};

export const update_todo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const Todos = await Todo.findByIdAndUpdate(
      id,
      { title },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!Todos) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({
      message: "Successfully Update Detail todolists...",
      result: Todos,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something Wrong in Update todo detail..." });
  }
};
