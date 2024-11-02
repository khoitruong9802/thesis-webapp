import express from "express";
import { getAllActuatorData, getActuatorDataById, createActuatorData, updateActuatorData, deleteActuatorData } from "../controllers/ActuatorDataController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllActuatorData);
router.get("/:actuatorData_id", authMiddleware, getActuatorDataById);
router.post("/", authMiddleware, createActuatorData);
router.put("/:actuatorData_id", authMiddleware, updateActuatorData);
router.delete("/:actuatorData_id", authMiddleware, deleteActuatorData);

export default router;