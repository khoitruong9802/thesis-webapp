import {
  getAllSchedules as modelGetAllSchedules,
  getSchedules as modelGetSchedules,
  createSchedule as modelCreateSchedule,
  updateSchedule as modelUpdateSchedule,
  deleteSchedule as modelDeleteSchedule,
  getScheduleById as modelGetScheduleById,
  getSchedulesCount as modelGetSchedulesCount,
} from "../models/ScheduleModel.js";
import { formatSchedule } from "../utils/helper.js";

export const getAllSchedules = async () => {
  try {
    const result = await modelGetAllSchedules();
    return result.map((schedule) => formatSchedule(schedule));
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};
export const getSchedules = async (page = 1, limit = 10) => {
  try {
    const result = await modelGetSchedules(page, limit);
    const totalCount = await modelGetSchedulesCount();
    const totalPages = Math.ceil(totalCount / limit);

    return {
      page: parseInt(page, 10),
      total_pages: totalPages,
      total_count: totalCount,
      data: result.map((schedule) => formatSchedule(schedule)),
    };
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const getScheduleById = async (id) => {
  try {
    const result = await modelGetScheduleById(id);
    return formatSchedule(result);
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const createSchedule = async (schedule) => {
  try {
    const result = await modelCreateSchedule(schedule);
    const { image, ...newData } = result;
    return formatSchedule(newData);
  } catch (error) {
    console.log("Service:", error);
    throw new Error(error);
  }
};

// export const updateSchedule = async (id, schedule) => {
//   try {
//     const {
//       schedule_name,
//       priority,
//       area,
//       description,
//       flow1,
//       flow2,
//       flow3,
//       cycle,
//       status,
//       start_time,
//       stop_time,
//       schedule_type,
//       start_day,
//       end_day,
//       days,
//       fertilizer_device_id,
//     } = schedule;
//     const result = await modelUpdateSchedule(
//       id,
//       schedule_name,
//       priority,
//       area,
//       description,
//       flow1,
//       flow2,
//       flow3,
//       cycle,
//       status,
//       start_time,
//       stop_time,
//       schedule_type,
//       start_day,
//       end_day,
//       days,
//       fertilizer_device_id
//     );
//     return result;
//   } catch (error) {
//     console.log("Service:", error);
//     throw new Error("Server error");
//   }
// };
export const updateSchedule = async (id, schedule) => {
  try {
    const result = await modelUpdateSchedule(id, schedule);
    return formatSchedule(result);
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};

export const deleteSchedule = async (id) => {
  try {
    const result = await modelDeleteSchedule(id);
    return formatSchedule(result);
  } catch (error) {
    console.log("Service:", error);
    throw new Error("Server error");
  }
};
