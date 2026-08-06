import express from "express";
import { signup, login, editUser } from "../controllers/userController.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

router.post("/", signup);
router.post("/login", login);
router.put("/:id", authMiddleware, editUser);

export default router;