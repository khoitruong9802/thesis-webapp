import express from "express";
import { getScheduleHistorys } from "../controllers/ScheduleHistoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getScheduleHistorys);

export default router;
