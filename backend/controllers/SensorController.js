import { Sensor } from "../models/SensorModel.js"

export const getAllSensor = async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.status(200).json(sensors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getSensorById = async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.sensor_id);
    if (!sensor) {
      return res.status(400).json({ message: "Sensor not found" });
    }
    res.status(200).json(sensor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createSensor = async (req, res) => {
  try {
    const newSensor = req.body;

    const sensor = new Sensor(newSensor);
    await sensor.save();

    res.status(200).json(sensor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateSensor = async (req, res) => {
  try {
    const updateSensor = req.body;

    const sensor = await Sensor.findByIdAndUpdate(req.params.sensor_id, req.body, { new: true, runValidators: true });
    if (!sensor) {
      return res.status(400).json({ message: "Sensor not found" });
    }

    res.status(200).json(sensor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteSensor = async (req, res) => {
  try {
    const sensor = await Sensor.findByIdAndDelete(req.params.sensor_id);
    if (!sensor) {
      return res.status(400).json({ message: "Sensor not found" });
    }
    res.status(200).json({ message: "Sensor deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}