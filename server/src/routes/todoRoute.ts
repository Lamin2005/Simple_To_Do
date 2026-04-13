import express from "express";
import { create, delete_todo, read, update_todo } from "../controllers/todo";
import protect from "../middlewares/authmiddleware";
import authorizeduser from "../middlewares/authorizeduser";

const router = express.Router();

router.post("/create", protect, create);
router.get("/todolists", read);
router.delete("/delete/:id", protect, authorizeduser, delete_todo);
router.put("/todolist-edit/:id", protect, authorizeduser, update_todo);

export default router;
