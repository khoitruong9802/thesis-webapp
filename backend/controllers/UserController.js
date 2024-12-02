import {
  getUsers as serviceGetUsers,
  getUserById as serviceGetUserById,
  createUser as serviceCreateUser,
  updateUser as serviceUpdateUser,
  deleteUser as serviceDeleteUser,
  checkUserValid as serviceCheckUserValid,
} from "../services/UserService.js";
import dotenv from "dotenv";
import { refreshTokenJwtService } from "../services/JwtService.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

dotenv.config();

export const getUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const users = await serviceGetUsers(page, limit);
    res.status(200).json(users);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await serviceGetUserById(req.params.id);
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = req.body;
    const response = await serviceCreateUser(user);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Controller:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateUser = req.body;
    const id = req.params.id;
    const user = await serviceUpdateUser(id, updateUser);
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await serviceDeleteUser(id);
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await serviceCheckUserValid({ username, password });
    return res.status(200).json(response);
  } catch (error) {
    console.log("Controller:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginGoogle = async (req, res) => {
  const { token } = req.body;

  try {
    const response = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );

    const { email, name, picture } = response.data;

    // Generate JWT token
    const jwtToken = jwt.sign({ email, name, picture }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token: jwtToken,
      user: { email, name, picture },
    });
  } catch (error) {
    console.log("Controller:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "The token is required" });
    }
    const response = await refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};

const JWT_SECRET = process.env.JWT_SECRET;
