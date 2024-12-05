import {
  getNotifications as modelGetNotifications,
  createNotification as modelCreateNotification,
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

export const getNotificationsWeb = async () => {
  try {
    const result = await modelGetNotifications();
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
