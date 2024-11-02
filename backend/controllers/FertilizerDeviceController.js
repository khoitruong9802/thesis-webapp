import { FertilizerDevice } from "../models/FertilizerDeviceModel.js"

export const getAllFertilizerDevice = async (req, res) => {
  try {
    const fertilizerDevices = await FertilizerDevice.find();
    res.status(200).json(fertilizerDevices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getFertilizerDeviceById = async (req, res) => {
  try {
    const fertilizerDevice = await FertilizerDevice.findById(req.params.fertilizerDevice_id);
    if (!fertilizerDevice) {
      return res.status(400).json({ message: "FertilizerDevice not found" });
    }
    res.status(200).json(fertilizerDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createFertilizerDevice = async (req, res) => {
  try {
    const newFertilizerDevice = req.body;

    const fertilizerDevice = new FertilizerDevice(newFertilizerDevice);
    await fertilizerDevice.save();

    res.status(200).json(fertilizerDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateFertilizerDevice = async (req, res) => {
  try {
    const updateFertilizerDevice = req.body;

    const fertilizerDevice = await FertilizerDevice.findByIdAndUpdate(req.params.fertilizerDevice_id, req.body, { new: true, runValidators: true });
    if (!fertilizerDevice) {
      return res.status(400).json({ message: "FertilizerDevice not found" });
    }

    res.status(200).json(fertilizerDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteFertilizerDevice = async (req, res) => {
  try {
    const fertilizerDevice = await FertilizerDevice.findByIdAndDelete(req.params.fertilizerDevice_id);
    if (!fertilizerDevice) {
      return res.status(400).json({ message: "FertilizerDevice not found" });
    }
    res.status(200).json({ message: "FertilizerDevice deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}