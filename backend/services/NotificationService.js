import {
  getNotifications as modelGetNotifications,
  getNotificationsWeb as modelGetNotificationsWeb,
  createNotification as modelCreateNotification,
  getNotificationsUnread as modelGetNotificationsUnread,
  setReadAll as modelSetReadAll,
} from "../models/NotificationModel.js";

export const getNotifications = async () => {
  try {
    const result = await modelGetNotifications();
    return result.map((item) => item.message);
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const setReadAll = async () => {
  try {
    const result = await modelSetReadAll();
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const getNotificationsUnread = async () => {
  try {
    const result = await modelGetNotificationsUnread();
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const getNotificationsWeb = async () => {
  try {
    const result = await modelGetNotificationsWeb();
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const createNotification = async (message, createAt) => {
  try {
    const result = await modelCreateNotification(message, createAt);
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error(error);
  }
};
