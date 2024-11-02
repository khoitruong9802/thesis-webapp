import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import initWebRoutes from "./routers/index.js";

import fileUpload from "express-fileupload";
import path from "path";

const app = express();

app.use(cors());
app.use(fileUpload());
// app.use(express.static(path.join(__dirname, "public")));

// import { connectMqtt, publishToTopic, subscribeToTopic } from "./services/MqttService.js";
// import { authMiddleware } from "./middlewares/authMiddleware.js";
// import { Schedule } from "./models/ScheduleModel.js";

dotenv.config();
const PORT = process.env.PORT;
const URI = process.env.MONGODB_URI;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5500",
    "https://smartfarmkks.netlify.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

initWebRoutes(app);

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to mongodb");
    // Start the server
    // connectMqtt();
    // subscribeToTopic("khoitruong9802/feeds/schedules");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// })
