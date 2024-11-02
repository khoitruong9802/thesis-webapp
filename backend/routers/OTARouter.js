import express from "express";
import {
  getLastestFirmware,
  getUpload,
  postUpload,
} from "../controllers/OTAController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/latest-firmware", getLastestFirmware);
router.get("/upload", getUpload);
router.post("/upload", postUpload);

export default router;
