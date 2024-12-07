import Sidebar from "../components/SideBar";
import { useRef, useState, useEffect } from "react";
import { DoubleRightOutlined } from "@ant-design/icons";
import mqtt from "mqtt";
import { notification } from "antd";
import { getNotificationsUnread } from "../../../services/notificationService";
import { useDispatch } from "react-redux";
import {
  setNumberOfNotification,
  increaseOne,
} from "../../../store/slices/notificationSlice";

const brokerUrl = `ws://${import.meta.env.VITE_MQTT_BROKER_URL}:${
  import.meta.env.VITE_MQTT_BROKER_PORT
}`;

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const mqttClient = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getNotificationsUnread();
      dispatch(setNumberOfNotification(res.data.count));
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Connect to the broker
    mqttClient.current = mqtt.connect(brokerUrl, {
      username: import.meta.env.VITE_MQTT_BROKER_USERNAME,
      password: import.meta.env.VITE_MQTT_BROKER_PASSWORD,
    });

    // On connection
    mqttClient.current.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqttClient.current.subscribe(
        "18faa0dd7a927906cb3e/feeds/notification",
        (err) => {
          if (err) {
            console.error("Failed to subscribe:", err);
          } else {
            console.log(
              "Subscribed to topic: 18faa0dd7a927906cb3e/feeds/notification"
            );
          }
        }
      );
    });

    // On message received
    mqttClient.current.on("message", (topic, message) => {
      console.log(`Message received on ${topic}: ${message.toString()}`);
      if (topic.includes("notification")) {
        notification.info({
          message: "Notification",
          duration: 10,
          description: message.toString(),
          placement: "bottomRight",
        });
        dispatch(increaseOne());
      }
    });

    // Cleanup on component unmount
    return () => {
      mqttClient.current.end(() => {
        console.log("Disconnected to MQTT broker");
      }); // Disconnect from the broker
    };
  }, []);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div>
      <button
        onClick={openSidebar}
        className={`${
          isSidebarOpen ? "-translate-x-8" : "translate-x-0"
        } fixed top-1/2 transition transform ease-linear duration-500 bg-gray-200 text-blue-800 w-8 h-12 flex rounded-r-xl items-center justify-center active:bg-gray-300 focus:outline-none hover:bg-gray-200 hover:text-gray-800 z-10`}
      >
        <DoubleRightOutlined className="text-2xl" />
      </button>
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div
        className={`transition-all duration-500 h-screen ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
