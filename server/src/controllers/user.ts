import { Request, Response } from "express";
import User from "../models/user";
import { generateToken } from "../utils/genertateToken";
import asyncHandler from "../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("Already Exist with this email!");
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(400);
    throw new Error("Something went Wrong!");
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existUser = await User.findOne({ email });

  if (!existUser) {
    res.status(404);
    throw new Error("User not Found!");
  }

  const isMatched = await existUser.isMatched(password);

  if (!isMatched) {
    res.status(400);
    throw new Error("Invalid password");
  }

  if (existUser && isMatched) {
    const token = generateToken(existUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ message: "Login Successfull!", user: existUser, token: token });
  } else {
    res.status(401);
    throw new Error("Invalid Crendentials!");
  }
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires : new Date(0)
  });

  res.status(200).json({ message: "Logout Successfully! " });
});
