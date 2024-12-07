import mqtt from "mqtt";

const brokerUrl = `ws://${import.meta.env.VITE_MQTT_BROKER_URL}:${
  import.meta.env.VITE_MQTT_BROKER_PORT
}`;

export const mqttClient = mqtt.connect(brokerUrl, {
  username: import.meta.env.VITE_MQTT_BROKER_USERNAME,
  password: import.meta.env.VITE_MQTT_BROKER_PASSWORD,
  // manualConnect: true,
});
