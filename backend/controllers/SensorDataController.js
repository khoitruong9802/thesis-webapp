import {
  getSensorData as serviceGetSensorData,
  getSensorDataWeb as serviceGetSensorDataWeb,
  getSensorDataAreaWeb as serviceGetSensorDataAreaWeb,
} from "../services/SensorDataService.js";

export const getSensorData = async (req, res) => {
  try {
    const area_id = req.params.area_id;
    const name = req.params.name;
    const sensorData = await serviceGetSensorData(name, area_id);
    res.status(200).json(sensorData);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSensorDataAreaWeb = async (req, res) => {
  try {
    const area_id = req.params.area_id;
    const sensorData = await serviceGetSensorDataAreaWeb(area_id);
    res.status(200).json(sensorData);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSensorDataWeb = async (req, res) => {
  try {
    const area_id = req.params.area_id;
    const name = req.params.name;
    const sensorData = await serviceGetSensorDataWeb(name, area_id);
    res.status(200).json(sensorData);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const createSensorData = async (req, res) => {
//   try {
//     const sensorData = req.body;
//     const response = await serviceCreateSensorData(sensorData);
//     return res.status(200).json(response);
//   } catch (error) {
//     console.log("Controller:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
