import express from "express";
import {
  getAllSchedules,
  getSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/ScheduleController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all", authMiddleware, getAllSchedules);
router.get("/", authMiddleware, getSchedules);
router.get("/:id", authMiddleware, getScheduleById);
router.post("/", authMiddleware, createSchedule);
router.put("/:id", authMiddleware, updateSchedule);
router.delete("/:id", authMiddleware, deleteSchedule);

export default router;
