import { ActuatorData } from "../models/ActuatorDataModel.js"

export const getAllActuatorData = async (req, res) => {
  try {
    const actuatorDatas = await ActuatorData.find();
    res.status(200).json(actuatorDatas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getActuatorDataById = async (req, res) => {
  try {
    const actuatorData = await ActuatorData.findById(req.params.actuatorData_id);
    if (!actuatorData) {
      return res.status(400).json({ message: "ActuatorData not found" });
    }
    res.status(200).json(actuatorData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createActuatorData = async (req, res) => {
  try {
    const newActuatorData = req.body;

    const actuatorData = new ActuatorData(newActuatorData);
    await actuatorData.save();

    res.status(200).json(actuatorData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateActuatorData = async (req, res) => {
  try {
    const updateActuatorData = req.body;

    const actuatorData = await ActuatorData.findByIdAndUpdate(req.params.actuatorData_id, req.body, { new: true, runValidators: true });
    if (!actuatorData) {
      return res.status(400).json({ message: "ActuatorData not found" });
    }

    res.status(200).json(actuatorData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteActuatorData = async (req, res) => {
  try {
    const actuatorData = await ActuatorData.findByIdAndDelete(req.params.actuatorData_id);
    if (!actuatorData) {
      return res.status(400).json({ message: "ActuatorData not found" });
    }
    res.status(200).json({ message: "ActuatorData deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}