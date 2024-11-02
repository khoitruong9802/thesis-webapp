import express from "express";
import { getAllSchedule, getScheduleById, createSchedule, updateSchedule, deleteSchedule } from "../controllers/ScheduleController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/", authMiddleware, getAllSchedule);
router.get("/:schedule_id", authMiddleware, getScheduleById);
router.post("/", authMiddleware, createSchedule);
router.put("/:schedule_id", authMiddleware, updateSchedule);
router.delete("/:schedule_id", authMiddleware, deleteSchedule);

export default router;