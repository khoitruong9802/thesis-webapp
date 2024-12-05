import express from "express";
import {
  getLastestFirmware,
  getUpload,
  postUpload,
  getAllFileName,
} from "../controllers/OTAController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/latest-firmware", getLastestFirmware);
router.get("/all", getAllFileName);
router.get("/upload", getUpload);
router.post("/upload", postUpload);

export default router;
