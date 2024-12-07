import express from "express";
import {
  getNotifications,
  getNotificationsWeb,
  getNotificationsUnread,
  setReadAll,
} from "../controllers/NotificationController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getNotifications);
router.get("/web", getNotificationsWeb);
router.get("/unread", getNotificationsUnread);
router.get("/readall", setReadAll);

export default router;
