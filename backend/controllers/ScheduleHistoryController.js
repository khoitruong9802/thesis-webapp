import { getScheduleHistorys as serviceGetScheduleHistorys } from "../services/ScheduleHistoryService.js";

export const getScheduleHistorys = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const scheduleHistory = await serviceGetScheduleHistorys(page, limit);
    res.status(200).json(scheduleHistory);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const createScheduleHistory = async (req, res) => {
//   try {
//     const scheduleHistory = req.body;
//     const response = await serviceCreateScheduleHistory(scheduleHistory);
//     return res.status(200).json(response);
//   } catch (error) {
//     console.log("Controller:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
