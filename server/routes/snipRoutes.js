import express from "express";
import {
    addSnip,
    editSnip,
    deleteSnip
} from "../controllers/snipsController.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

router.post("/", authMiddleware, addSnip);
router.put("/:id", authMiddleware, editSnip);
router.delete("/:id", authMiddleware, deleteSnip);

export default router;