import express from "express"

import {
    addProject,
    editProject,
    deleteProject
} from "../controllers/projectController.js"
import { authMiddleware } from "../utils/auth"
const router = express.Router();

router.post("/", authMiddleware, addProject );
router.put("/:id", authMiddleware, editProject );
router.delete("/:id", authMiddleware, deleteProject);

export default router;