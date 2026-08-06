import express from "express";

import {
    addTask,
    editTask,
    deleteTask
} from "../controllers/taskController.js"
import { authMiddleware } from "../utils/auth";

const router=express.Router();

router.post("/", authMiddleware, addTask );
router.put("/:id", authMiddleware, editTask);
router.delte("/:id", authMiddleware, deleteTask);

export default router;