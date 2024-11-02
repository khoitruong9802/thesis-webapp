import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: "2h" }
  );

  return access_token;
};

export const generateRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: "30d" }
  );

  return refresh_token;
};

export const refreshTokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_SECRET_KEY, async (err, user) => {
        if (err) {
          resolve({
            status: "ERR",
            message: "Refresh token is not ok",
          });
        }
        const access_token = await generateAccessToken({
          id: user?.id,
        });
        resolve({
          status: "OK",
          message: "SUCESS",
          access_token,
        });
      });
    } catch (err) {
      reject(err);
    }
  });
};