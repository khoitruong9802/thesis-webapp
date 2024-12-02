import pool from "../config/database.js";

// Fetch all users
export const getAllUsers = async () => {
  const query = "SELECT * FROM users";
  const { rows } = await pool.query(query);
  return rows;
};

// Fetch user by ID
export const getUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const getUsers = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const query = "SELECT * FROM users ORDER BY id DESC LIMIT $1 OFFSET $2";
  const { rows } = await pool.query(query, [limit, offset]);
  return rows;
};

// Create a new user
export const createUser = async (username, password, email, full_name) => {
  const query = `
    INSERT INTO users (username, password, email, full_name)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const { rows } = await pool.query(query, [
    username,
    password,
    email,
    full_name,
  ]);
  return rows[0];
};

// Update an existing user
export const updateUser = async (id, username, password, email, full_name) => {
  const query = `
    UPDATE users
    SET username = $1, password = $2, email = $3, full_name = $4
    WHERE id = $5 RETURNING *`;
  const { rows } = await pool.query(query, [
    username,
    password,
    email,
    full_name,
    id,
  ]);
  return rows[0];
};

// Delete a user by ID
export const deleteUser = async (id) => {
  const query = "DELETE FROM users WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const doesUsernameExist = async (username) => {
  const query = "SELECT * FROM users WHERE username = $1";
  const { rows } = await pool.query(query, [username]);
  return rows[0];
};

export const checkUserValid = async (username, password) => {
  const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
  const { rows } = await pool.query(query, [username, password]);
  return rows[0];
};

export const getUsersCount = async () => {
  const countResult = await pool.query("SELECT COUNT(*) FROM users");
  return parseInt(countResult.rows[0].count, 10);
};
