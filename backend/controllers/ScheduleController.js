import { Schedule } from "../models/ScheduleModel.js"

export const getAllSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.schedule_id);
    if (!schedule) {
      return res.status(400).json({ message: "Schedule not found" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createSchedule = async (req, res) => {
  try {
    const newSchedule = req.body;

    const schedule = new Schedule(newSchedule);
    await schedule.save();

    res.status(200).json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateSchedule = async (req, res) => {
  try {
    const updateSchedule = req.body;

    const schedule = await Schedule.findByIdAndUpdate(req.params.schedule_id, req.body, { new: true, runValidators: true });
    if (!schedule) {
      return res.status(400).json({ message: "Schedule not found" });
    }

    res.status(200).json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.schedule_id);
    if (!schedule) {
      return res.status(400).json({ message: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}