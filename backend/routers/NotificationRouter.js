import express from "express";
import { getNotifications } from "../controllers/NotificationController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getNotifications);

export default router;
