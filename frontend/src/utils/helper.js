const convertSnakeToCamel = (obj) => {
  if (!obj || typeof obj !== "object") return obj; // Return if obj is not an object

  // Helper function to convert snake_case to camelCase
  const toCamel = (str) =>
    str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

  // Iterate over the keys and convert to camelCase
  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = toCamel(key); // Convert key to camelCase
    acc[camelKey] = Array.isArray(obj[key]) // Check if value is an array
      ? obj[key].map((item) =>
          typeof item === "object" ? convertSnakeToCamel(item) : item
        )
      : typeof obj[key] === "object"
      ? convertSnakeToCamel(obj[key]) // Recursively convert nested objects
      : obj[key];
    return acc;
  }, {});
};

const convertCamelToSnake = (obj) => {
  if (!obj || typeof obj !== "object") return obj; // Return if obj is not an object

  // Helper function to convert camelCase to snake_case
  const toSnake = (str) =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

  // Iterate over the keys and convert to snake_case
  return Object.keys(obj).reduce((acc, key) => {
    const snakeKey = toSnake(key); // Convert key to snake_case
    acc[snakeKey] = Array.isArray(obj[key]) // Check if value is an array
      ? obj[key].map((item) =>
          typeof item === "object" ? convertCamelToSnake(item) : item
        )
      : typeof obj[key] === "object"
      ? convertCamelToSnake(obj[key]) // Recursively convert nested objects
      : obj[key];
    return acc;
  }, {});
};

export { convertSnakeToCamel, convertCamelToSnake };
