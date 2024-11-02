import express from "express";
import user from "./UserRouter.js";
import OTA from "./OTARouter.js";
import station from "./StationRouter.js";
import schedule from "./ScheduleRouter.js";
import fertilizerDevice from "./FertilizerDeviceRouter.js";

import { __dirname } from "../utils/helper.js";
import path from "path";

const initWebRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/OTA", express.static(path.join(__dirname, "uploads")), OTA);
  app.use("/api/v1/schedule", schedule);
  app.use("/api/v1/station", station);
  app.use("/api/v1/fertilizerDevice", fertilizerDevice);
};

export default initWebRoutes;
