import {
  getSensorData as modelGetSensorData,
  getSensorDataWeb as modelGetSensorDataWeb,
  createSensorData as modelCreateSensorData,
} from "../models/SensorDataModel.js";

export const getSensorData = async (name, area) => {
  try {
    const result = await modelGetSensorData(name, area);
    return result.map((item) => item.value);
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const getSensorDataWeb = async () => {
  try {
    const result = await modelGetSensorDataWeb();
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const createSensorData = async (name, value, area) => {
  try {
    const result = await modelCreateSensorData({ name, value, area });
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error(error);
  }
};
