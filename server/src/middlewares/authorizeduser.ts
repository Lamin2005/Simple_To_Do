import { NextFunction, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { AuthenticatedRequest } from "./authmiddleware";
import Todo from "../models/todolist";

const authorizeduser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?._id;

    console.log(userId);

    if (!id) {
      res.status(400);
      throw new Error("Bad Request: Missing todoId parameter");
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404);
      throw new Error("Todo not found");
    }

    if (todo.userId.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error("Not Authorized to access this todo");
    }

    console.log(todo.id);
    console.log(req.user?._id);

    next();
  },
);

export default authorizeduser;
