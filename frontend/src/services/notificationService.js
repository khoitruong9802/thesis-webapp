import request from "../utils/http";

export const getNotifications = async () => {
  const res = await request.get(`notification/web`);
  return res;
};
