import request from "../utils/http";

export const getStation = async () => {
  const res = await request.get("/station");
  return res;
}

export const createStation = async (data) => {
  const res = await request.post("/station", data);
  return res;
}