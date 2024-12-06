import request from "../utils/http";

export const getScheduleHistorys = async () => {
  const res = await request.get("schedule-history");
  return res;
};
