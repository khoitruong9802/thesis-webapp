import pool from "../config/database.js";

// Fetch all fertilizer_devices
export const getAllFertilizerDevices = async () => {
  const query = "SELECT * FROM fertilizer_devices";
  const { rows } = await pool.query(query);
  return rows;
};

// Fetch user by ID
export const getFertilizerDeviceById = async (id) => {
  const query = "SELECT * FROM fertilizer_devices WHERE id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// Fetch user by ID
export const getSchedulesByFertilizerDevice = async (
  id,
  page = 1,
  limit = 10
) => {
  const offset = (page - 1) * limit;
  const query =
    "SELECT * FROM schedules WHERE fertilizer_device_id = $1 ORDER BY id DESC LIMIT $2 OFFSET $3";
  const { rows } = await pool.query(query, [id, limit, offset]);

  // Transform the rows
  const transformedRows = rows.map((row) => ({
    ...row,
    priority: Number(row.priority),
    area: Number(row.area),
    status: Number(row.status),
    start_day: new Date(row.start_day).toLocaleDateString("en-CA"), // Convert to local date (YYYY-MM-DD)
    end_day: new Date(row.end_day).toLocaleDateString("en-CA"), // Convert to local date (YYYY-MM-DD)
    start_time: row.start_time.substring(0, 5),
    stop_time: row.stop_time.substring(0, 5),
    days: row.days
      .replace(/[{}]/g, "")
      .split(",")
      .filter((item) => item !== "")
      .map(Number), // Convert '{2,3,4}' to [2, 3, 4]
  }));

  return transformedRows;
};

export const getFertilizerDevices = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const query =
    "SELECT * FROM fertilizer_devices ORDER BY id DESC LIMIT $1 OFFSET $2";
  const { rows } = await pool.query(query, [limit, offset]);
  return rows;
};

// Create a new user
export const createFertilizerDevice = async (name, device_code) => {
  const query = `
    INSERT INTO fertilizer_devices (name, device_code)
    VALUES ($1, $2) RETURNING *`;
  const { rows } = await pool.query(query, [name, device_code]);
  return rows[0];
};

// Update an existing user
export const updateFertilizerDevice = async (id, name, device_code) => {
  const query = `
    UPDATE fertilizer_devices
    SET name = $1, device_code = $2
    WHERE id = $3 RETURNING *`;
  const { rows } = await pool.query(query, [name, device_code, id]);
  return rows[0];
};

// Delete a user by ID
export const deleteFertilizerDevice = async (id) => {
  const query = "DELETE FROM fertilizer_devices WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const getFertilizerDevicesCount = async () => {
  const countResult = await pool.query(
    "SELECT COUNT(*) FROM fertilizer_devices"
  );
  return parseInt(countResult.rows[0].count, 10);
};

export const getScheduleCount = async (id) => {
  const countResult = await pool.query(
    "SELECT COUNT(*) FROM schedules WHERE fertilizer_device_id = $1",
    [id]
  );
  return parseInt(countResult.rows[0].count, 10);
};
