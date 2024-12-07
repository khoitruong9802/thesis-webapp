import express from "express";
import {
  getSensorData,
  getSensorDataWeb,
  getSensorDataAreaWeb,
} from "../controllers/SensorDataController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/web/:name/:area_id", getSensorDataWeb);
router.get("/web/:area_id", getSensorDataAreaWeb);
router.get("/:name/:area_id", getSensorData);

export default router;
