import express from "express";
import { create, delete_todo, read } from "../controllers/todo";

const router = express.Router();

router.post("/create", create);
router.get("/todolists", read);
router.delete("/delete", delete_todo);

export default router;
