import {
  getFertilizerDevices as serviceGetFertilizerDevices,
  getFertilizerDeviceById as serviceGetFertilizerDeviceById,
  createFertilizerDevice as serviceCreateFertilizerDevice,
  updateFertilizerDevice as serviceUpdateFertilizerDevice,
  deleteFertilizerDevice as serviceDeleteFertilizerDevice,
  getSchedulesByFertilizerDevice as serviceGetSchedulesByFertilizerDevice,
  getSchedulesByFertilizerDeviceWeb as serviceGetSchedulesByFertilizerDeviceWeb,
} from "../services/FertilizerDeviceService.js";

export const getFertilizerDevices = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const fertilizerDevices = await serviceGetFertilizerDevices(page, limit);
    res.status(200).json(fertilizerDevices);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFertilizerDeviceById = async (req, res) => {
  try {
    const fertilizerDevice = await serviceGetFertilizerDeviceById(
      req.params.id
    );
    if (!fertilizerDevice) {
      return res.status(500).json({ message: "FertilizerDevice not found" });
    }
    res.status(200).json(fertilizerDevice);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSchedulesByFertilizerDevice = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const fertilizerDevice = await serviceGetSchedulesByFertilizerDevice(
      req.params.id,
      page,
      limit
    );
    if (!fertilizerDevice) {
      return res.status(500).json({ message: "FertilizerDevice not found" });
    }
    res.status(200).json(fertilizerDevice);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSchedulesByFertilizerDeviceWeb = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const fertilizerDevice = await serviceGetSchedulesByFertilizerDeviceWeb(
      req.params.id,
      page,
      limit
    );
    if (!fertilizerDevice) {
      return res.status(500).json({ message: "FertilizerDevice not found" });
    }
    res.status(200).json(fertilizerDevice);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createFertilizerDevice = async (req, res) => {
  try {
    const fertilizerDevice = req.body;
    const response = await serviceCreateFertilizerDevice(fertilizerDevice);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Controller:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateFertilizerDevice = async (req, res) => {
  try {
    const updateFertilizerDevice = req.body;
    const id = req.params.id;
    const fertilizerDevice = await serviceUpdateFertilizerDevice(
      id,
      updateFertilizerDevice
    );
    if (!fertilizerDevice) {
      return res.status(500).json({ message: "FertilizerDevice not found" });
    }
    res.status(200).json(fertilizerDevice);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteFertilizerDevice = async (req, res) => {
  try {
    const id = req.params.id;
    const fertilizerDevice = await serviceDeleteFertilizerDevice(id);
    if (!fertilizerDevice) {
      return res.status(500).json({ message: "FertilizerDevice not found" });
    }
    res.status(200).json({ message: "FertilizerDevice deleted" });
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};
