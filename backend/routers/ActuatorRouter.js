import express from "express";
import { getAllActuator, getActuatorById, createActuator, updateActuator, deleteActuator } from "../controllers/ActuatorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/", authMiddleware, getAllActuator);
router.get("/:actuator_id", authMiddleware, getActuatorById);
router.post("/", authMiddleware, createActuator);
router.put("/:actuator_id", authMiddleware, updateActuator);
router.delete("/:actuator_id", authMiddleware, deleteActuator);

export default router;