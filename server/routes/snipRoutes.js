import express from "express";
import {
    getSnip,
    getSnips,
    addSnip,
    editSnip,
    deleteSnip
} from "../controllers/snipsController.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

router.get("/:id", authMiddleware, getSnip);
router.get("/", authMiddleware, getSnips);
router.post("/", authMiddleware, addSnip);
router.put("/:id", authMiddleware, editSnip);
router.delete("/:id", authMiddleware, deleteSnip);

export default router;