import express from "express";
import { getAllSensorData, getSensorDataById, createSensorData, updateSensorData, deleteSensorData } from "../controllers/SensorDataController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllSensorData);
router.get("/:sensorData_id", authMiddleware, getSensorDataById);
router.post("/", authMiddleware, createSensorData);
router.put("/:sensorData_id", authMiddleware, updateSensorData);
router.delete("/:sensorData_id", authMiddleware, deleteSensorData);

export default router;