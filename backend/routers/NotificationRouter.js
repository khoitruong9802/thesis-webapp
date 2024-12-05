import express from "express";
import {
  getNotifications,
  getNotificationsWeb,
} from "../controllers/NotificationController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getNotifications);
router.get("/web", getNotificationsWeb);

export default router;
