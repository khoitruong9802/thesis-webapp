import {
  getUsers as modelGetUsers,
  createUser as modelCreateUser,
  updateUser as modelUpdateUser,
  deleteUser as modelDeleteUser,
  getUserById as modelGetUserById,
  checkUserValid as modelCheckUserValid,
  getUsersCount as modelGetUsersCount,
  // doesUsernameExist,
} from "../models/UserModel.js";
import { generateAccessToken, generateRefreshToken } from "./JwtService.js";

export const getUsers = async (page = 1, limit = 10) => {
  try {
    const result = await modelGetUsers(page, limit);
    const totalCount = await modelGetUsersCount();
    const totalPages = Math.ceil(totalCount / limit);

    return {
      page: parseInt(page, 10),
      total_pages: totalPages,
      total_count: totalCount,
      data: result,
    };
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const getUserById = async (id) => {
  try {
    const result = await modelGetUserById(id);
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const createUser = async (user) => {
  try {
    const { username, password, email, full_name } = user;
    // const usernameExists = await doesUsernameExist(username);
    // if (usernameExists) {
    //   throw new Error("Username already exists");
    // }

    const result = await modelCreateUser(username, password, email, full_name);
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error(error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const { username, password, email, full_name } = user;
    const result = await modelUpdateUser(
      id,
      username,
      password,
      email,
      full_name
    );
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const deleteUser = async (id) => {
  try {
    const result = await modelDeleteUser(id);
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const checkUserValid = async (userLogin) => {
  try {
    const { username, password } = userLogin;
    const result = await modelCheckUserValid(username, password);
    if (!result) {
      throw new Error("Username or password is invalid");
    }
    const access_token = generateAccessToken({
      id: result.id.toString(),
    });
    const refresh_token = generateRefreshToken({
      id: result.id.toString(),
    });
    return { access_token, refresh_token };
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};
