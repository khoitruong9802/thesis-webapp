import {
  getThresholds as serviceGetThresholds,
  updateThreshold as serviceUpdateThreshold,
} from "../services/ThresholdService.js";

export const getThresholds = async (req, res) => {
  try {
    const thresholds = await serviceGetThresholds();
    res.status(200).json(thresholds);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateThreshold = async (req, res) => {
  try {
    const updateThreshold = req.body;
    const id = req.params.id;
    const threshold = await serviceUpdateThreshold(id, updateThreshold);
    if (!threshold) {
      return res.status(500).json({ message: "Threshold not found" });
    }
    res.status(200).json(threshold);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: error.message });
  }
};
