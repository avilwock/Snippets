import express from "express"

import {
    getProject,
    getProjects,
    addProject,
    editProject,
    deleteProject
} from "../controllers/projectController.js"
import { authMiddleware } from "../utils/auth.js"

const router = express.Router();

router.get("/:id", authMiddleware, getProject);
router.get("/", authMiddleware, getProjects);
router.post("/", authMiddleware, addProject );
router.put("/:id", authMiddleware, editProject );
router.delete("/:id", authMiddleware, deleteProject);

export default router;