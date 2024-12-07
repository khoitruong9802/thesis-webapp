import request from "../utils/http";

export const getSensorData = async (area) => {
  const res = await request.get(`/sensor-data/web/${area}`);
  return res;
};
