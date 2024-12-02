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
  loginGoogle,
} from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);
router.post("/google-login", loginGoogle);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshToken);

export default router;
