import {
  getNotifications as serviceGetNotifications,
  getNotificationsWeb as serviceGetNotificationsWeb,
} from "../services/NotificationService.js";

export const getNotifications = async (req, res) => {
  try {
    const notification = await serviceGetNotifications();
    res.status(200).json(notification);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNotificationsWeb = async (req, res) => {
  try {
    const notification = await serviceGetNotificationsWeb();
    res.status(200).json(notification);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const createNotification = async (req, res) => {
//   try {
//     const notification = req.body;
//     const response = await serviceCreateNotification(notification);
//     return res.status(200).json(response);
//   } catch (error) {
//     console.log("Controller:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
