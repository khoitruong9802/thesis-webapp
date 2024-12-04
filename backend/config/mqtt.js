import mqtt from "mqtt";
import dotenv from "dotenv";
import { createNotification } from "../services/NotificationService.js";

dotenv.config();

const topics = [
  "humi",
  "temp",
  "nito",
  "photpho",
  "kali",
  "relay1",
  "relay2",
  "relay3",
  "relay4",
  "relay5",
  "relay6",
  "relay7",
  "relay8",
  "schedules",
  "gateway-send",
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

    topics.forEach((value) => {
      client.subscribe(`18faa0dd7a927906cb3e/feeds/${value}`, (err) => {
        if (err) {
          console.error("Subscription error:", err);
        } else {
          console.log(
            `Subscribed to topic: 18faa0dd7a927906cb3e/feeds/${value}`
          );
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
  client.on("message", (topic, message) => {
    console.log(`Received message on ${topic}: ${message.toString()}`);

    if (topic === "18faa0dd7a927906cb3e/feeds/gateway-send") {
      try {
        createNotification(message.toString());
        publish(
          "18faa0dd7a927906cb3e/feeds/notification",
          message.toString(),
          1
        );
      } catch (error) {
        console.log("MQTT:", error);
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
