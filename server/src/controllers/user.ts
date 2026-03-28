import { Request, Response } from "express";
import User from "../models/user";
import { generateToken } from "../utils/genertateToken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(404).json({ message: "User not Found!" });
    }

    const isMatched = await existUser.isMatched(password);

    if (!isMatched) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (existUser && isMatched) {
      const token = generateToken(existUser._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json({ message: "Login Successfull!", user: existUser, token: token });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error login user", error });
  }
};
