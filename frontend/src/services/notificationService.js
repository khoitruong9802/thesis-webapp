import request from "../utils/http";

export const getNotifications = async () => {
  const res = await request.get(`notification/web`);
  return res;
};

export const getNotificationsUnread = async () => {
  const res = await request.get(`notification/unread`);
  return res;
};

export const setReadAll = async () => {
  const res = await request.get(`notification/readall`);
  return res;
};
