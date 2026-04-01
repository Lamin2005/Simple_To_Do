import { Request, Response } from "express";
import User from "../models/user";
import { generateToken } from "../utils/genertateToken";
import asyncHandler from "../utils/asyncHandler";
import { AuthenticatedRequest } from "../middlewares/authmiddleware";

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
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout Successfully! " });
});

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;

  res.status(200).json({ message: "User Profile is show", user: user });
};

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const user_id = req.user?._id;

  if (!user_id) {
    res.status(404);
    throw new Error("No Authenicated!");
  }

  let existUser = await User.findById(user_id);

  if (!existUser) {
    res.status(404);
    throw new Error("User not Found!");
  }

  const { name, email, password } = req.body;

  existUser.name = name ?? existUser.name;
  existUser.email = email ?? existUser.email;

  if (password) {
    existUser.password = password;
  }

  let updateUser = await existUser.save();

  const selectedUser = {
    _id: updateUser._id,
    name: updateUser.name,
    email: updateUser.email,
  };

  res
    .status(200)
    .json({ message: "User Profile is Update", user: selectedUser });
};
