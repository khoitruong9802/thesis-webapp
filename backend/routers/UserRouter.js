import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  loginUser,
  deleteUser,
  refreshToken,
  logoutUser,
  loginGG,
} from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getUsers);
router.get("/:user_id", authMiddleware, getUserById);
router.post("/", createUser);
router.put("/:user_id", authMiddleware, updateUser);
router.delete("/:user_id", authMiddleware, deleteUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.post("/refresh-token", refreshToken);
router.post("/google-login", loginGG);

export default router;
