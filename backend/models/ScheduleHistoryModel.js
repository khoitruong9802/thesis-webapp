import pool from "../config/database.js";

export const getScheduleHistorys = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const query = `SELECT sh.*, s.schedule_name
      FROM schedule_history sh
      JOIN schedules s ON sh.schedule_id = s.id
      ORDER BY sh.id DESC
      LIMIT $1 OFFSET $2;`;

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23", // Ensures 24-hour format
  };

  const convertDateTime = (input) => {
    const formatter = new Intl.DateTimeFormat("en-CA", options);
    const parts = formatter.formatToParts(input);
    const formattedDate = `${parts.find((p) => p.type === "year").value}-${
      parts.find((p) => p.type === "month").value
    }-${parts.find((p) => p.type === "day").value} ${
      parts.find((p) => p.type === "hour").value
    }:${parts.find((p) => p.type === "minute").value}:${
      parts.find((p) => p.type === "second").value
    }`;
    return formattedDate;
  };

  const { rows } = await pool.query(query, [limit, offset]);
  return rows.map((row) => ({
    ...row,
    start_time: convertDateTime(row.start_time),
    stop_time: convertDateTime(row.stop_time),
  }));
};

// Create a new user
export const createScheduleHistory = async (
  startTime,
  stopTime,
  result,
  scheduleId
) => {
  const query = `
      INSERT INTO schedule_history (start_time, stop_time, result, schedule_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

  const values = [startTime, stopTime, result, scheduleId];

  // Execute the query
  const { rows } = await pool.query(query, values);

  // Return the newly inserted record
  return rows[0];
};

export const getScheduleHistoryCount = async () => {
  const countResult = await pool.query("SELECT COUNT(*) FROM schedule_history");
  return parseInt(countResult.rows[0].count, 10);
};
