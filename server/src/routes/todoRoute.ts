import express from "express";
import { create, delete_todo, read, readdetail, update_todo } from "../controllers/todo";

const router = express.Router();

router.post("/create", create);
router.get("/todolists", read);
router.delete("/delete", delete_todo);
router.get("/todolists/:id", readdetail);
router.put("/todolist-edit/:id", update_todo);

export default router;
