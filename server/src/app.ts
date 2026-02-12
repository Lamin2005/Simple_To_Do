import express from "express";
import dotenv from "dotenv";
import { contect_DB } from "./db/db";
import todoRoutes from "./routes/todoRoute";

dotenv.config();
const app = express();

app.use(express.json());

app.use(todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  contect_DB();
  console.log("Server is running on port " + PORT);
});
