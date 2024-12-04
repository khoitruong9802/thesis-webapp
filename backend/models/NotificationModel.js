import pool from "../config/database.js";

export const getNotifications = async () => {
  const query = "SELECT * FROM notifications ORDER BY id DESC LIMIT 5";
  const { rows } = await pool.query(query);

  return rows;
};

// Create a new user
export const createNotification = async (message) => {
  const query = `
    INSERT INTO notifications (fertilizer_device_id, message, is_read)
    VALUES ($1, $2, $3) RETURNING *`;
  const { rows } = await pool.query(query, [1, message, false]);

  return rows[0];
};
