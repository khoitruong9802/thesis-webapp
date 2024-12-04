import pool from "../config/database.js";

export const getThresholds = async () => {
  const query = "SELECT * FROM threshold";
  const { rows } = await pool.query(query);
  return rows;
};

// Update an existing user
export const updateThreshold = async (id, threshold) => {
  const {
    min_temperature,
    max_temperature,
    min_kali,
    max_kali,
    min_photpho,
    max_photpho,
    min_nito,
    max_nito,
  } = threshold;

  const query = `
    UPDATE threshold
    SET 
      min_temperature = $1,
      max_temperature = $2,
      min_kali = $3,
      max_kali = $4,
      min_photpho = $5,
      max_photpho = $6,
      min_nito = $7,
      max_nito = $8
    WHERE id = $9
    RETURNING *;
  `;

  const values = [
    min_temperature ?? null,
    max_temperature ?? null,
    min_kali ?? null,
    max_kali ?? null,
    min_photpho ?? null,
    max_photpho ?? null,
    min_nito ?? null,
    max_nito ?? null,
    id,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};
