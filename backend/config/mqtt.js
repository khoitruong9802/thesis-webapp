import mqtt from "mqtt";
import dotenv from "dotenv";
import { createNotification } from "../services/NotificationService.js";
import { createScheduleHistory } from "../services/ScheduleHistoryService.js";
import { createSensorData } from "../services/SensorDataService.js";

dotenv.config();

const topics = [
  ["area1/humi", 2],
  ["area1/temp", 2],
  ["area1/nito", 2],
  ["area1/photpho", 2],
  ["area1/kali", 2],
  ["area2/humi", 2],
  ["area2/temp", 2],
  ["area2/nito", 2],
  ["area2/photpho", 2],
  ["area2/kali", 2],
  ["area3/humi", 2],
  ["area3/temp", 2],
  ["area3/nito", 2],
  ["area3/photpho", 2],
  ["area3/kali", 2],
  ["relay1", 2],
  ["relay2", 2],
  ["relay3", 2],
  ["relay4", 2],
  ["relay5", 2],
  ["relay6", 2],
  ["relay7", 2],
  ["relay8", 2],
  ["schedules", 2],
  ["gateway-send", 2],
];

let client;

const startMqttClient = () => {
  // Initialize MQTT client
  client = mqtt.connect(process.env.MQTT_BROKER_URL, {
    clientId: "mqtt_client_" + Math.random().toString(16).substr(2, 8),
    clean: true,
    connectTimeout: 4000,
    port: process.env.MQTT_BROKER_PORT,
    username: process.env.MQTT_BROKER_USERNAME,
    password: process.env.MQTT_BROKER_PASSWORD,
  });

  // Handle MQTT connection events
  client.on("connect", () => {
    console.log("Connected to MQTT broker");

    topics.forEach(([topic, qos]) => {
      const fullTopic = `18faa0dd7a927906cb3e/feeds/${topic}`;
      client.subscribe(fullTopic, { qos }, (err) => {
        if (err) {
          console.error("Subscription error:", err);
        } else {
          console.log(`Subscribed to topic: ${fullTopic} with QoS: ${qos}`);
        }
      });
    });
  });

  client.on("error", (err) => {
    console.error("MQTT Error:", err);
  });

  client.on("close", () => {
    console.log("Disconnected from MQTT broker");
  });

  // Example: Listen for a specific topic (optional)
  client.on("message", async (topic, message) => {
    console.log(`Received message on ${topic}: ${message.toString()}`);

    if (topic === "18faa0dd7a927906cb3e/feeds/gateway-send") {
      try {
        const data = JSON.parse(message.toString());
        if (data.message_type === "schedule_end") {
          await createScheduleHistory({
            startTime: data.task_start_time,
            stopTime: data.task_end_time,
            result: 1,
            scheduleId: data.schedule_id,
          });
        }
        await createNotification(data.message, data.timestamp);
        publish("18faa0dd7a927906cb3e/feeds/notification", data.message, 1);
      } catch (error) {
        console.log("MQTT:", error);
      }
    } else if (topic.includes("area1")) {
      if (topic.includes("humi")) {
        createSensorData("humi", message.toString(), 1);
      } else if (topic.includes("temp")) {
        createSensorData("temp", message.toString(), 1);
      } else if (topic.includes("nito")) {
        createSensorData("nito", message.toString(), 1);
      } else if (topic.includes("photpho")) {
        createSensorData("photpho", message.toString(), 1);
      } else if (topic.includes("kali")) {
        createSensorData("kali", message.toString(), 1);
      }
    } else if (topic.includes("area2")) {
      if (topic.includes("humi")) {
        createSensorData("humi", message.toString(), 2);
      } else if (topic.includes("temp")) {
        createSensorData("temp", message.toString(), 2);
      } else if (topic.includes("nito")) {
        createSensorData("nito", message.toString(), 2);
      } else if (topic.includes("photpho")) {
        createSensorData("photpho", message.toString(), 2);
      } else if (topic.includes("kali")) {
        createSensorData("kali", message.toString(), 2);
      }
    } else if (topic.includes("area3")) {
      if (topic.includes("humi")) {
        createSensorData("humi", message.toString(), 3);
      } else if (topic.includes("temp")) {
        createSensorData("temp", message.toString(), 3);
      } else if (topic.includes("nito")) {
        createSensorData("nito", message.toString(), 3);
      } else if (topic.includes("photpho")) {
        createSensorData("photpho", message.toString(), 3);
      } else if (topic.includes("kali")) {
        createSensorData("kali", message.toString(), 3);
      }
    }
  });
};

// Function to publish messages
const publish = (topic, message, QoS) => {
  if (!client || !client.connected) {
    console.error("MQTT client is not connected");
    return;
  }

  client.publish(topic, message, { qos: QoS, retain: false }, (err) => {
    if (err) {
      console.error("Failed to publish message:", err);
    } else {
      console.log(`Message published to ${topic}: ${message}`);
    }
  });
};

export { startMqttClient, publish };
