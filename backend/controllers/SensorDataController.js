import { SensorData } from "../models/SensorDataModel.js"

export const getAllSensorData = async (req, res) => {
  try {
    const sensorDatas = await SensorData.find();
    res.status(200).json(sensorDatas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getSensorDataById = async (req, res) => {
  try {
    const sensorData = await SensorData.findById(req.params.sensorData_id);
    if (!sensorData) {
      return res.status(400).json({ message: "SensorData not found" });
    }
    res.status(200).json(sensorData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createSensorData = async (req, res) => {
  try {
    const newSensorData = req.body;

    const sensorData = new SensorData(newSensorData);
    await sensorData.save();

    res.status(200).json(sensorData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateSensorData = async (req, res) => {
  try {
    const updateSensorData = req.body;

    const sensorData = await SensorData.findByIdAndUpdate(req.params.sensorData_id, req.body, { new: true, runValidators: true });
    if (!sensorData) {
      return res.status(400).json({ message: "SensorData not found" });
    }

    res.status(200).json(sensorData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteSensorData = async (req, res) => {
  try {
    const sensorData = await SensorData.findByIdAndDelete(req.params.sensorData_id);
    if (!sensorData) {
      return res.status(400).json({ message: "SensorData not found" });
    }
    res.status(200).json({ message: "SensorData deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}