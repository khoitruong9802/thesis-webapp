import {
  getSensorData as modelGetSensorData,
  getSensorDataWeb as modelGetSensorDataWeb,
  createSensorData as modelCreateSensorData,
  getSensorDataAreaWeb as modelGetSensorDataAreaWeb,
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

export const getSensorDataAreaWeb = async (area) => {
  try {
    const result = await modelGetSensorDataAreaWeb(area);
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const getSensorDataWeb = async (name, area) => {
  try {
    const result = await modelGetSensorDataWeb(name, area);
    const data = {
      value: result.map((item) => item.value),
      labels: result.map((item) => {
        const date = new Date(item.create_at);

        const options = {
          hour: "2-digit",
          minute: "2-digit",
        };

        // Format the time
        return date.toLocaleTimeString("en-US", options);
      }),
    };
    return data;
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
