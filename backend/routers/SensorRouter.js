import express from "express";
import { getAllSensor, getSensorById, createSensor, updateSensor, deleteSensor } from "../controllers/SensorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllSensor);
router.get("/:sensor_id", authMiddleware, getSensorById);
router.post("/", authMiddleware, createSensor);
router.put("/:sensor_id", authMiddleware, updateSensor);
router.delete("/:sensor_id", authMiddleware, deleteSensor);

export default router;