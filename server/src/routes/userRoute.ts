import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} from "../controllers/user";
import express from "express";
import protect from "../middlewares/authmiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.route("/profile").get(protect,getProfile).put(protect, updateProfile);

export default router;
