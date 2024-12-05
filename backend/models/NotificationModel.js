import pool from "../config/database.js";

export const getNotifications = async () => {
  const query = "SELECT * FROM notifications ORDER BY id DESC LIMIT 5";
  const { rows } = await pool.query(query);

  return rows;
};

// Create a new user
export const createNotification = async (message, createAt) => {
  const query = `
    INSERT INTO notifications (fertilizer_device_id, message, is_read, create_at)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const { rows } = await pool.query(query, [1, message, false, createAt]);

  return rows[0];
};
