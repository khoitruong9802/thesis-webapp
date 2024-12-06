import pool from "../config/database.js";

export const getSensorData = async (name, area) => {
  const query =
    "SELECT * FROM sensor_data WHERE area=$1 AND name=$2 ORDER BY id DESC LIMIT 8";
  const { rows } = await pool.query(query, [area, name]);
  console.log(rows);
  return rows;
};

export const getSensorDataWeb = async (name, area) => {
  const query = "SELECT * FROM notifications ORDER BY id DESC";
  const { rows } = await pool.query(query);

  return rows;
};

// Create a new user
export const createSensorData = async (data) => {
  const query = `INSERT INTO sensor_data (name, value, fertilizer_device_id, area)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
                `;

  const { name, value, area } = data;
  const result = await pool.query(query, [name, value, 1, area]);
  return result.rows[0];
};
