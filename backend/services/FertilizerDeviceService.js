import {
  getFertilizerDevices as modelGetFertilizerDevices,
  createFertilizerDevice as modelCreateFertilizerDevice,
  updateFertilizerDevice as modelUpdateFertilizerDevice,
  deleteFertilizerDevice as modelDeleteFertilizerDevice,
  getFertilizerDeviceById as modelGetFertilizerDeviceById,
  getFertilizerDevicesCount as modelGetFertilizerDevicesCount,
  getSchedulesByFertilizerDevice as modelGetSchedulesByFertilizerDevice,
  getScheduleCount as modelGetScheduleCount,
} from "../models/FertilizerDeviceModel.js";

export const getFertilizerDevices = async (page = 1, limit = 10) => {
  try {
    const result = await modelGetFertilizerDevices(page, limit);
    const totalCount = await modelGetFertilizerDevicesCount();
    const totalPages = Math.ceil(totalCount / limit);

    return {
      page: parseInt(page, 10),
      total_pages: totalPages,
      total_count: totalCount,
      data: result,
    };
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const getFertilizerDeviceById = async (id) => {
  try {
    const result = await modelGetFertilizerDeviceById(id);
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const getSchedulesByFertilizerDevice = async (
  id,
  page = 1,
  limit = 10
) => {
  try {
    const result = await modelGetSchedulesByFertilizerDevice(id, page, limit);
    const totalCount = await modelGetScheduleCount(id);
    const totalPages = Math.ceil(totalCount / limit);
    return {
      page: parseInt(page, 10),
      total_pages: totalPages,
      total_count: totalCount,
      data: result,
    };
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const createFertilizerDevice = async (fertilizer_device) => {
  try {
    const { name, device_code } = fertilizer_device;
    const result = await modelCreateFertilizerDevice(name, device_code);
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error(error);
  }
};

export const updateFertilizerDevice = async (id, fertilizer_device) => {
  try {
    const { name, device_code } = fertilizer_device;
    const result = await modelUpdateFertilizerDevice(id, name, device_code);
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const deleteFertilizerDevice = async (id) => {
  try {
    const result = await modelDeleteFertilizerDevice(id);
    return result;
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};
