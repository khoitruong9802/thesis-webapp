import {
  getScheduleHistorys as modelGetScheduleHistorys,
  createScheduleHistory as modelCreateScheduleHistory,
  getScheduleHistoryCount as modelGetScheduleHistoryCount,
} from "../models/ScheduleHistoryModel.js";

export const getScheduleHistorys = async (page = 1, limit = 10) => {
  try {
    const result = await modelGetScheduleHistorys(page, limit);
    const totalCount = await modelGetScheduleHistoryCount();
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

export const createScheduleHistory = async (scheduleHistory) => {
  const { startTime, stopTime, result, scheduleId } = scheduleHistory;
  try {
    const result_ = await modelCreateScheduleHistory(
      startTime,
      stopTime,
      result,
      scheduleId
    );
    return result_;
  } catch (error) {
    console.log("Service:", error);
    throw new Error(error);
  }
};
