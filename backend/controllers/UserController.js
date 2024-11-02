import { User } from "../models/UserModel.js";
import {
  checkUser,
  createUser as createNewUser,
} from "../services/UserService.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { refreshTokenJwtService } from "../services/JwtService.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

dotenv.config();

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const { full_name, username, password, confirm_password } = newUser;
    // const hash = bcrypt.hashSync(newUser.password, 10);
    // newUser.password = hash;
    if (full_name.length === 0) {
      return res.status(400).json({
        status: "ERR",
        message: "Fullname must be at least one character",
      });
    }
    if (username.length < 8) {
      return res.status(400).json({
        status: "ERR",
        message: "Username must be at least 8 character",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        status: "ERR",
        message: "Password must be at least 8 character",
      });
    }
    if (password !== confirm_password) {
      return res.status(400).json({
        status: "ERR",
        message: "Password and confirm password didn't match. Try again.",
      });
    }

    const response = await createNewUser(newUser);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateUser = req.body;
    // const hash = bcrypt.hashSync(updateUser.password, 10);
    // updateUser.password = hash;

    const user = await User.findByIdAndUpdate(req.params.user_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await checkUser(req.body);
    const { refresh_token, ...newReponse } = response;
    // res.cookie("refresh_token", refresh_token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "strict",
    //   path: "/",
    // });
    return res.status(200).json({ ...newReponse, refresh_token });
  } catch (e) {
    console.error("Error in login user:", e);
    return res.status(500).json({
      status: "ERR",
      message: "Internal Server Error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.user_id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const JWT_SECRET = process.env.JWT_SECRET;

export const loginGG = async (req, res) => {
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
    console.error("Error verifying Google token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
