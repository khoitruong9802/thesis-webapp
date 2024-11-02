import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getNewToken } from "../services/userServices"

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

const isTokenExpired = (token) => {
  const tokenDecode = jwtDecode(token);
  const exp = tokenDecode.exp * 1000;
  return Date.now() >= exp;
};

request.interceptors.request.use(async (config) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return config;
  }
  const accessToken = localStorage.getItem("accessToken");

  if (isTokenExpired(accessToken)) {
    if (!isTokenExpired(refreshToken)) {
      try {
        const res = await getNewToken(refreshToken);
        config.headers.Authorization = `Bearer ${res?.access_token}`;
        console.log("New access token = ", res.access_token)
        localStorage.setItem("accessToken", res.access_token);
      } catch (error) {
        console.log("Can not refresh token");
      }
    } else {
      localStorage.removeItem("refreshToken");
    }
  } else {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
},
  (error) => {
    return Promise.reject(error);
  }
)

// // Server side check
// // Function to refresh the token
// const refreshAuthLogic = async (failedRequest) => {
//   const refreshToken = localStorage.getItem('refreshToken'); // Replace with your refresh token storage logic
//   try {
//     const response = await request.post('/refresh-token', { token: refreshToken });
//     const { token } = response.data;
//     localStorage.setItem('token', token);
//     failedRequest.response.config.headers.Authorization = `Bearer ${token}`;
//     return Promise.resolve();
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// request.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       await refreshAuthLogic(originalRequest);
//       return request(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

export default request;