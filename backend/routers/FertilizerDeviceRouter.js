import express from "express";
import {
  getFertilizerDevices,
  getFertilizerDeviceById,
  getSchedulesByFertilizerDevice,
  createFertilizerDevice,
  updateFertilizerDevice,
  deleteFertilizerDevice,
} from "../controllers/FertilizerDeviceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getFertilizerDevices);
router.get("/:id", authMiddleware, getFertilizerDeviceById);
router.get("/:id/schedule", authMiddleware, getSchedulesByFertilizerDevice);
router.post("/", authMiddleware, createFertilizerDevice);
router.put("/:id", authMiddleware, updateFertilizerDevice);
router.delete("/:id", authMiddleware, deleteFertilizerDevice);

export default router;
