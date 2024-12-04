import express from "express";
import user from "./UserRouter.js";
import OTA from "./OTARouter.js";
import schedule from "./ScheduleRouter.js";
import fertilizerDevice from "./FertilizerDeviceRouter.js";
import notification from "./NotificationRouter.js";
import threshold from "./ThresholdRouter.js";

import { __dirname } from "../utils/helper.js";
import path from "path";

const initWebRoutes = (app) => {
  app.use("/api/v1/OTA", express.static(path.join(__dirname, "uploads")), OTA);
  app.use("/api/v1/user", user);
  app.use("/api/v1/schedule", schedule);
  app.use("/api/v1/fertilizer-device", fertilizerDevice);
  app.use("/api/v1/notification", notification);
  app.use("/api/v1/threshold", threshold);
};

export default initWebRoutes;
