import pool from "../config/database.js";

// Fetch all schedules
export const getAllSchedules = async () => {
  const query = `
  SELECT 
    id,
    schedule_name,
    priority,
    area,
    description,
    flow1,
    flow2,
    flow3,
    cycle,
    status,
    start_time,
    stop_time,
    schedule_type,
    start_day,
    end_day,
    fertilizer_device_id,
    days
  FROM public.schedules
  ORDER BY id;
  `;
  const { rows } = await pool.query(query);

  return rows;
};

// Fetch user by ID
export const getScheduleById = async (id) => {
  const query = "SELECT * FROM schedules WHERE id = $1";
  const { rows } = await pool.query(query, [id]);

  if (rows.length === 0) {
    return undefined;
  }

  return rows[0];
};

export const getSchedules = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const query = "SELECT * FROM schedules ORDER BY id DESC LIMIT $1 OFFSET $2";
  const { rows } = await pool.query(query, [limit, offset]);

  return rows;
};

// Create a new user
export const createSchedule = async ({
  schedule_name,
  priority,
  area,
  description,
  flow1,
  flow2,
  flow3,
  cycle,
  status,
  start_time,
  stop_time,
  schedule_type,
  start_day,
  end_day = "",
  days,
  fertilizer_device_id,
  image = null,
}) => {
  if (end_day === "") {
    end_day = null;
  }
  const query = `
    INSERT INTO schedules (schedule_name, priority, area, description, flow1, flow2, flow3, cycle, status, start_time, stop_time, schedule_type, start_day, end_day, days, fertilizer_device_id, image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15::days_enum[], $16, $17) RETURNING *`;
  const { rows } = await pool.query(query, [
    schedule_name,
    priority,
    area,
    description,
    flow1,
    flow2,
    flow3,
    cycle,
    status,
    start_time,
    stop_time,
    schedule_type,
    start_day,
    end_day,
    days,
    fertilizer_device_id,
    image,
  ]);

  if (rows.length === 0) {
    return undefined;
  }

  return rows[0];
};

// // Update an existing user
// export const updateSchedule = async (
//   id,
//   schedule_name,
//   priority,
//   area,
//   description,
//   flow1,
//   flow2,
//   flow3,
//   cycle,
//   status,
//   start_time,
//   stop_time,
//   schedule_type,
//   start_day,
//   end_day,
//   days,
//   fertilizer_device_id
// ) => {
//   const query = `
//     UPDATE schedules
//     SET
//       schedule_name = $1,
//       priority = $2,
//       area = $3,
//       description = $4,
//       flow1 = $5,
//       flow2 = $6,
//       flow3 = $7,
//       cycle = $8,
//       status = $9,
//       start_time = $10,
//       stop_time = $11,
//       schedule_type = $12,
//       start_day = $13,
//       end_day = $14,
//       days = $15,
//       fertilizer_device_id = $16
//     WHERE id = $17 RETURNING *`;
//   const { rows } = await pool.query(query, [
//     schedule_name,
//     priority,
//     area,
//     description,
//     flow1,
//     flow2,
//     flow3,
//     cycle,
//     status,
//     start_time,
//     stop_time,
//     schedule_type,
//     start_day,
//     end_day,
//     days,
//     fertilizer_device_id,
//     id,
//   ]);

//   if (rows.length === 0) {
//     return undefined;
//   }

//   // Transform the rows
//   const transformedRows = {
//     ...rows[0],
//     priority: Number(rows[0].priority),
//     area: Number(rows[0].area),
//     status: Number(rows[0].status),
//     start_day: new Date(rows[0].start_day).toLocaleDateString("en-CA"), // Convert to local date (YYYY-MM-DD)
//     end_day: new Date(rows[0].end_day).toLocaleDateString("en-CA"), // Convert to local date (YYYY-MM-DD)
//     start_time: rows[0].start_time.substring(0, 5),
//     stop_time: rows[0].stop_time.substring(0, 5),
//     days: rows[0].days.replace(/[{}]/g, "").split(",").filter((item) => item !== "").map(Number) // Convert '{2,3,4}' to [2, 3, 4]
//   };

//   return transformedRows;
// };
export const updateSchedule = async (id, updates) => {
  // Initialize query fragments and values array
  const fields = [];
  const values = [];

  // Dynamically build the query based on the provided fields
  Object.keys(updates).forEach((key, index) => {
    fields.push(`${key} = $${index + 1}`); // Add field placeholder
    values.push(updates[key]); // Add corresponding value
  });

  // Add the id to the values array
  values.push(id);

  // Construct the final query
  const query = `
    UPDATE schedules
    SET ${fields.join(", ")}
    WHERE id = $${values.length} 
    RETURNING 
    id,
    schedule_name,
    priority,
    area,
    description,
    flow1,
    flow2,
    flow3,
    cycle,
    status,
    start_time,
    stop_time,
    schedule_type,
    start_day,
    end_day,
    fertilizer_device_id,
    days`;

  // Execute the query
  const { rows } = await pool.query(query, values);

  // If no rows were updated, return undefined
  if (rows.length === 0) {
    return undefined;
  }

  return rows[0];
};

// Delete a user by ID
export const deleteSchedule = async (id) => {
  const query = "DELETE FROM schedules WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);

  if (rows.length === 0) {
    return undefined;
  }

  return rows[0];
};

export const getSchedulesCount = async () => {
  const countResult = await pool.query("SELECT COUNT(*) FROM schedules");
  return parseInt(countResult.rows[0].count, 10);
};
