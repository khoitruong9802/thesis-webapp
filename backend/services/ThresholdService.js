import {
  getThresholds as modelGetThresholds,
  updateThreshold as modelUpdateThreshold,
} from "../models/ThresholdModel.js";

export const getThresholds = async () => {
  try {
    const result = await modelGetThresholds();
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const updateThreshold = async (id, threshold) => {
  try {
    const result = await modelUpdateThreshold(id, threshold);
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};
