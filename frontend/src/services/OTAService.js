import request from "../utils/http";

export const getVersion = async () => {
  const res = await request.get("/OTA/upload");
  return res;
};

export const uploadFile = async (data) => {
  const res = await request.post("/OTA/upload", data);
  return res;
};
