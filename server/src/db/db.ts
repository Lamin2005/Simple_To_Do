import { response } from "express";
import mongoose from "mongoose";

export const contect_DB = async () => {
  try {
    let dbstring = "";

    if (process.env.NODE_ENV === "development") {
      dbstring = process.env.MONGODB_URL!;
    }

    if (process.env.NODE_ENV === "production") {
      dbstring = process.env.MONGODB_ALTAS!;
    }

    const dbconnect = await mongoose.connect(dbstring);
    console.log(`DB connected successfully : ${dbconnect.connection.host}...`);
  } catch (error) {
    console.log(error);
    response.json({ message: "Something Wrong..." });
    process.exit(1);
  }
};
