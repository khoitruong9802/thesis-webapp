import express from "express";
import {
  getSensorData,
  getSensorDataWeb,
} from "../controllers/SensorDataController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:name/:area_id", getSensorData);
router.get("/web", getSensorDataWeb);

export default router;
