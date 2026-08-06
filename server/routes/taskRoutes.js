import express from "express";

import {

    getTask,
    getTasks,
    addTask,
    editTask,
    deleteTask
} from "../controllers/taskController.js"
import { authMiddleware } from "../utils/auth.js";

const router=express.Router();

router.get("/:id", authMiddleware, getTask);
router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, addTask );
router.put("/:id", authMiddleware, editTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;