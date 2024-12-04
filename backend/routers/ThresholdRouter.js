import express from "express";
import {
  getThresholds,
  updateThreshold,
} from "../controllers/ThresholdController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getThresholds);
// router.post("/", authMiddleware, createThreshold);
router.put("/:id", authMiddleware, updateThreshold);
// router.delete("/:id", authMiddleware, deleteThreshold);

export default router;
