import { NextFunction, Response, Request } from "express";
import asyncHandler from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import { Types } from "mongoose";

export interface AuthenticatedRequest extends Request {
  user?: {
    _id: Types.ObjectId;
    name: string;
    email: string;
  };
}

const protect = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("Not Authorized, No token");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

    const user = await User.findById(decoded.userid).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    req.user = user;

    next();
  },
);

export default protect;
