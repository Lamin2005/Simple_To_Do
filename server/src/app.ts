import express from "express";
import dotenv from "dotenv";
import { contect_DB } from "./db/db";
import todoRoutes from "./routes/todoRoute";
import userRoutes from "./routes/userRoute";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(todoRoutes);
app.use(userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  contect_DB();
  console.log("Server is running on port " + PORT);
});
