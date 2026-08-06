import express from "express";
import { getMe, signup, login, editUser } from "../controllers/userController.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.post("/", signup);
router.post("/login", login);
router.put("/:id", authMiddleware, editUser);

export default router;