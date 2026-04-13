import { Request, Response } from "express";
import Todo from "../models/todolist";
import { AuthenticatedRequest } from "../middlewares/authmiddleware";

export const create = async (req: AuthenticatedRequest, res: Response) => {
  const { title } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    res.status(401);
    throw new Error("Unauthorized: User not authenticated");
  }

  try {
    const newTodo = await Todo.create({
      title,
      userId,
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
  let { id } = req.params;
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

    if (!Todos) {
      return res.status(404).json({ message: "No todos found for this user" });
    }

    res.json({
      message: "Successfully Show todolists...",
      result: Todos,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something Wrong in show todo..." });
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
