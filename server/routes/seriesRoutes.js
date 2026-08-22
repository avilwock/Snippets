import express from "express";

import {
    getSeries,
    getSeriesList,
    addSeries,
    editSeries,
    deleteSeries
} from "../controllers/seriesController.js"
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

router.get("/:id", authMiddleware, getSeries);
router.get("/", authMiddleware, getSeriesList);
router.post("/", authMiddleware, addSeries);
router.post("/:id", authMiddleware, editSeries);
router.delete("/:id", authMiddleware, deleteSeries);

export default router;