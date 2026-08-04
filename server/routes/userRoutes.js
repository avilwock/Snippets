import express from "express";
import { signup, login, editUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", signup);
router.post("/login", login);
router.put("/:id", editUser);

export default router;