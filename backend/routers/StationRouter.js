import express from "express";
import {
  getAllStation,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
  getMemberByStationId,
  addMemberByStationId
} from "../controllers/StationController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/", authMiddleware, getAllStation);
router.get("/:station_id", authMiddleware, getStationById);
router.post("/", authMiddleware, createStation);
router.put("/:station_id", authMiddleware, updateStation);
router.delete("/:station_id", authMiddleware, deleteStation);

router.get("/:station_id/member", authMiddleware, getMemberByStationId);
router.post("/:station_id/member", authMiddleware, addMemberByStationId);

export default router;