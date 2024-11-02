import express from "express";
import { getAllFertilizerDevice, getFertilizerDeviceById, createFertilizerDevice, updateFertilizerDevice, deleteFertilizerDevice } from "../controllers/FertilizerDeviceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/", authMiddleware, getAllFertilizerDevice);
router.get("/:fertilizerDevice_id", authMiddleware, getFertilizerDeviceById);
router.post("/", authMiddleware, createFertilizerDevice);
router.put("/:fertilizerDevice_id", authMiddleware, updateFertilizerDevice);
router.delete("/:fertilizerDevice_id", authMiddleware, deleteFertilizerDevice);

export default router;