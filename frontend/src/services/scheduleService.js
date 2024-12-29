import request from "../utils/http";

export const getSchedules = async (page = 1, pageSize = 10) => {
  const res = await request.get(
    `fertilizer-device/web/1/schedule?page=${page}&limit=${pageSize}`
  );
  return res;
};

export const createSchedule = async (data) => {
  const res = await request.post("/schedule", data);
  return res;
};

export const updateSchedule = async (data) => {
  const res = await request.put(`/schedule/${data.id}`, data);
  return res;
};

export const deleteSchedule = async (id) => {
  const res = await request.delete(`/schedule/${id}`);
  return res;
};
