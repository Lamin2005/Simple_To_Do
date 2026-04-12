import express from "express";
import { create, delete_todo, read, readdetail, update_todo } from "../controllers/todo";
import protect from "../middlewares/authmiddleware";
import authorizeduser from "../middlewares/authorizeduser";

const router = express.Router();

router.post("/create",protect, create);
router.get("/todolists", read);
router.delete("/delete/:id", protect, authorizeduser, delete_todo);
router.get("/todolists/:id", readdetail);
router.put("/todolist-edit/:id", protect, authorizeduser, update_todo);

export default router;
