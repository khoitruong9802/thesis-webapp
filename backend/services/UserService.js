import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "./JwtService.js";

export const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { full_name, username, password } = newUser;
    try {
      const checkusernamelUser = await User.findOne({
        username: username,
      });
      if (checkusernamelUser !== null) {
        reject({
          status: "ERR",
          message: "The username is already used",
        });
      }
      // const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        full_name,
        username,
        password,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdUser,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const checkUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { username, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        username: username,
      });
      if (checkUser === null) {
        reject({
          status: "ERR",
          message: "The username is not defined",
        });
      }
      const comparePassword = password === checkUser.password;
      // const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        reject({
          status: "ERR",
          message: "The password is incorrect",
        });
      }
      const access_token = await generateAccessToken({
        id: checkUser._id.toString(),
      });

      const refresh_token = await generateRefreshToken({
        id: checkUser._id.toString(),
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//****  admin */

// const deleteUser = (id) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const checkUser = await User.findOne({
//         _id: id,
//       });
//       if (checkUser === null) {
//         resolve({
//           status: "ERR",
//           message: "The user is not defined",
//         });
//       }

//       await User.findByIdAndDelete(id);
//       resolve({
//         status: "OK",
//         message: "Delete user success",
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// const deleteManyUser = (ids) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await User.deleteMany({ _id: ids });
//       resolve({
//         status: "OK",
//         message: "Delete user success",
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// const getAllUser = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const allUser = await User.find().sort({ createdAt: -1, updatedAt: -1 });
//       resolve({
//         status: "OK",
//         message: "Success",
//         data: allUser,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
