import { Actuator } from "../models/ActuatorModel.js"

export const getAllActuator = async (req, res) => {
  try {
    const actuators = await Actuator.find();
    res.status(200).json(actuators);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getActuatorById = async (req, res) => {
  try {
    const actuator = await Actuator.findById(req.params.actuator_id);
    if (!actuator) {
      return res.status(400).json({ message: "Actuator not found" });
    }
    res.status(200).json(actuator);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createActuator = async (req, res) => {
  try {
    const newActuator = req.body;

    const actuator = new Actuator(newActuator);
    await actuator.save();

    res.status(200).json(actuator);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateActuator = async (req, res) => {
  try {
    const updateActuator = req.body;

    const actuator = await Actuator.findByIdAndUpdate(req.params.actuator_id, req.body, { new: true, runValidators: true });
    if (!actuator) {
      return res.status(400).json({ message: "Actuator not found" });
    }

    res.status(200).json(actuator);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteActuator = async (req, res) => {
  try {
    const actuator = await Actuator.findByIdAndDelete(req.params.actuator_id);
    if (!actuator) {
      return res.status(400).json({ message: "Actuator not found" });
    }
    res.status(200).json({ message: "Actuator deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}