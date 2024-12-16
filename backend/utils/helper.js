import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(path.dirname(__filename));

export const formatSchedule = (data) => {
  return {
    ...data,
    priority: Number(data.priority),
    area: Number(data.area),
    status: Number(data.status),
    start_day: new Date(data.start_day).toLocaleDateString("en-CA"), // Convert to local date (YYYY-MM-DD)
    end_day: data.end_day && new Date(data.end_day).toLocaleDateString("en-CA"), // Convert to local date (YYYY-MM-DD)
    start_time: data.start_time.substring(0, 5),
    stop_time: data.stop_time.substring(0, 5),
    days: data.days
      .replace(/[{}]/g, "")
      .split(",")
      .filter((item) => item !== "")
      .map(Number), // Convert '{2,3,4}' to [2, 3, 4]
  };
};
