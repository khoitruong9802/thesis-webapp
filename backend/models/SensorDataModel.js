import pool from "../config/database.js";

export const getSensorData = async (name, area) => {
  const query =
    "SELECT * FROM sensor_data WHERE area=$1 AND name=$2 ORDER BY id DESC LIMIT 8";
  const { rows } = await pool.query(query, [area, name]);
  return rows;
};

export const getSensorDataAreaWeb = async (area) => {
  const { rows: temp } = await pool.query(
    "SELECT * FROM sensor_data WHERE area=$1 AND name='temp' ORDER BY id DESC LIMIT 8",
    [area]
  );
  const { rows: humi } = await pool.query(
    "SELECT * FROM sensor_data WHERE area=$1 AND name='humi' ORDER BY id DESC LIMIT 8",
    [area]
  );
  const { rows: photpho } = await pool.query(
    "SELECT * FROM sensor_data WHERE area=$1 AND name='photpho' ORDER BY id DESC LIMIT 8",
    [area]
  );
  const { rows: kali } = await pool.query(
    "SELECT * FROM sensor_data WHERE area=$1 AND name='kali' ORDER BY id DESC LIMIT 8",
    [area]
  );
  const { rows: nito } = await pool.query(
    "SELECT * FROM sensor_data WHERE area=$1 AND name='nito' ORDER BY id DESC LIMIT 8",
    [area]
  );

  const reverseData = (rows) => {
    const values = rows.map((item) => item.value).reverse();
    const labels = rows
      .map((item) => {
        const date = new Date(item.create_at);

        const options = {
          hour: "2-digit",
          minute: "2-digit",
        };

        // Format the time
        return date.toLocaleTimeString("en-US", options);
      })
      .reverse();
    return { value: values, labels: labels };
  };

  const data = {
    temp: reverseData(temp),
    humi: reverseData(humi),
    photpho: reverseData(photpho),
    kali: reverseData(kali),
    nito: reverseData(nito),
  };
  return data;
};

export const getSensorDataWeb = async (name, area) => {
  const query =
    "SELECT * FROM sensor_data WHERE area=$1 AND name=$2 ORDER BY id DESC LIMIT 8";
  const { rows } = await pool.query(query, [area, name]);
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
