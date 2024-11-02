import request from "../utils/http";
import axios from "axios";

export const loginUser = async (data) => {
  const res = await request.post("/user/login", data);
  return res;
};

export const createUser = async (data) => {
  const res = await request.post("/user", data);
  return res;
};

export const getNewToken = async (refreshToken) => {
  let res;
  try {
    res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
  return res?.data;
};

export const logoutUser = async () => {
  const res = await request.post("/user/logout");
  return res.data;
};

// export const updateUser = async (id, data, accessToken) => {
//   const res = await request.put(
//     `/user/update-user/${id}`,
//     data,
//     {
//       headers: {
//         token: `Bearer ${accessToken}`,
//       },
//     }
//   );
//   return res.data;
// };
