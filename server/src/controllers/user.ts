import { Request, Response } from "express";
import User from "../models/user";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (existUser && (await existUser.isMatched(password))) {
      res.status(200).json({ message: "Login Successfull!", user: existUser });
    }

    res.status(404).json({ message: "User not Found!" });
  } catch (error) {
    res.status(500).json({ message: "Error login user", error });
  }
};
