import {
  getAllSchedules as serviceGetAllSchedules,
  getSchedules as serviceGetSchedules,
  getScheduleById as serviceGetScheduleById,
  createSchedule as serviceCreateSchedule,
  updateSchedule as serviceUpdateSchedule,
  deleteSchedule as serviceDeleteSchedule,
} from "../services/ScheduleService.js";
import { publish } from "../config/mqtt.js";

const fertilizerCode = "18faa0dd7a927906cb3e";

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await serviceGetAllSchedules();
    res.status(200).json(schedules);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSchedules = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const schedules = await serviceGetSchedules(page, limit);
    res.status(200).json(schedules);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getScheduleById = async (req, res) => {
  try {
    const schedule = await serviceGetScheduleById(req.params.id);
    if (!schedule) {
      return res.status(500).json({ message: "Schedule not found" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createSchedule = async (req, res) => {
  try {
    const schedule = req.body;
    const response = await serviceCreateSchedule(schedule);

    publish(
      `${fertilizerCode}/feeds/schedules`,
      JSON.stringify({ ...response, method: "ADD", id: response.id }),
      2
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log("Controller:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const updateSchedule = req.body;
    const id = req.params.id;
    const schedule = await serviceUpdateSchedule(id, updateSchedule);

    publish(
      `${fertilizerCode}/feeds/schedules`,
      JSON.stringify({ ...schedule, method: "EDIT", id: response.id }),
      2
    );

    if (!schedule) {
      return res.status(500).json({ message: "Schedule not found" });
    }

    publish(
      `${fertilizerCode}/feeds/schedules`,
      JSON.stringify({ ...schedule, method: "EDIT", id }),
      2
    );

    res.status(200).json(schedule);
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const id = req.params.id;
    const schedule = await serviceDeleteSchedule(id);
    if (!schedule) {
      return res.status(500).json({ message: "Schedule not found" });
    }

    publish(
      `${fertilizerCode}/feeds/schedules`,
      JSON.stringify({ method: "DEL", id }),
      2
    );

    res.status(200).json({ message: "Schedule deleted" });
  } catch (error) {
    console.log("Controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};
