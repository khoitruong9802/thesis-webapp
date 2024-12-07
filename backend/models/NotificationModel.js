import pool from "../config/database.js";

export const getNotifications = async () => {
  const query = "SELECT * FROM notifications ORDER BY id DESC LIMIT 5";
  const { rows } = await pool.query(query);

  return rows;
};

export const getNotificationsUnread = async () => {
  const query = "SELECT COUNT(*) FROM notifications WHERE is_read=false";
  const { rows } = await pool.query(query);

  return rows[0];
};

export const setReadAll = async () => {
  const query = "UPDATE public.notifications SET is_read = true";
  const { rows } = await pool.query(query);

  return rows;
};

export const getNotificationsWeb = async () => {
  const query = "SELECT * FROM notifications ORDER BY id DESC";
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
