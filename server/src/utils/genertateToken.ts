import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = (userid: Types.ObjectId) => {
  const token = jwt.sign({ userid }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });

  return token;
};
