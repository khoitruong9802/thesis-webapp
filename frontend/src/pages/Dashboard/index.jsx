// Import necessary libraries and CSS
import SensorCard from "../../components/SensorCard";
import Schedule from "../../components/Schedule";
import ScheduleForm from "../../components/ScheduleForm";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Area from "../../components/Area";
import { Modal, Pagination } from "antd";
import { PlusOutlined, EnvironmentFilled } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import mqtt from "mqtt";
import { useSelector, useDispatch } from "react-redux";
import {
  getSchedules,
  setCurrentPage,
  setEditId,
  setShowForm,
} from "../../store/slices/scheduleSlice";

const initialSensor = [
  {
    id: "temp",
    value: NaN,
    unit: "°C",
    label: "Soil temperature",
    color: "text-red-600",
  },
  {
    id: "humi",
    value: NaN,
    unit: "%",
    label: "Soil humidity",
    color: "text-blue-600",
  },
  {
    id: "nito",
    value: NaN,
    unit: "mg/kg",
    label: "Soil nitrogen",
    color: "text-indigo-600",
  },
  {
    id: "photpho",
    value: NaN,
    unit: "mg/kg",
    label: "Soil phosphorus",
    color: "text-indigo-600",
  },
  {
    id: "kali",
    value: NaN,
    unit: "mg/kg",
    label: "Soil potassium",
    color: "text-indigo-600",
  },
];

const areas = [{ areaId: 1 }, { areaId: 2 }, { areaId: 3 }];

const brokerUrl = `ws://${import.meta.env.VITE_MQTT_BROKER_URL}:${
  import.meta.env.VITE_MQTT_BROKER_PORT
}`;

const random_jdfjudu8d8f = [
  {
    id: 1212,
    id_phu: 1,
    name: "Fertilizer 1",
    device_code: "18faa0dd7a927906cb3e",
  },
  {
    id: 222,
    id_phu: 2,
    name: "Fertilizer 2",
    device_code: "7fmeieoif9eieo282iee",
  },
];

function Dashboard() {
  console.log(random_jdfjudu8d8f);
  const {
    schedules,
    totalSchedule,
    readLoading,
    error,
    currentPage,
    editId,
    showForm,
  } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();

  const mqttClient = useRef();

  const [deviceSelected, setDeviceSelected] = useState(1);
  const [areaSelected, setAreaSelected] = useState(1);
  const [sensor, setSensor] = useState(initialSensor);

  useEffect(() => {
    const { device_code } = random_jdfjudu8d8f.find(
      (item) => (item.id = deviceSelected)
    );
    console.log(device_code, deviceSelected);
    const topic = [
      "",
      `${device_code}/feeds/area1/#`,
      `${device_code}/feeds/area2/#`,
      `${device_code}/feeds/area3/#`,
    ];

    // Connect to the broker
    mqttClient.current = mqtt.connect(brokerUrl, {
      username: import.meta.env.VITE_MQTT_BROKER_USERNAME,
      password: import.meta.env.VITE_MQTT_BROKER_PASSWORD,
    });

    // On connection
    mqttClient.current.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqttClient.current.subscribe(topic[areaSelected], (err) => {
        if (err) {
          console.error("Failed to subscribe:", err);
        } else {
          console.log(`Subscribed to topic: ${topic[areaSelected]}`);
        }
      });
    });

    // On message received
    mqttClient.current.on("message", (topic, message) => {
      console.log(`Message received on ${topic}: ${message.toString()}`);
      setSensor((prev) =>
        prev.map((item) =>
          topic.includes(item.id)
            ? { ...item, value: Number(message.toString()) }
            : item
        )
      );
    });

    // Cleanup on component unmount
    return () => {
      mqttClient.current.end(() => {
        console.log("Disconnected to MQTT broker");
      }); // Disconnect from the broker
    };
  }, [areaSelected, deviceSelected]);

  useEffect(() => {
    dispatch(getSchedules([1, 4]));
  }, [dispatch]);

  const handleCancel = () => {
    dispatch(setShowForm(false));
  };

  // Show error page
  if (error) {
    return <Error message={error} />;
  }

  if (readLoading) {
    return <Loading />;
  }

  return (
    <div className="flex gap-4 flex-col h-screen p-4 relative">
      <div className="bg-white rounded-lg shadow-md p-4 w-full border border-gray-200">
        <div className="flex items-center gap-x-4">
          <h2 className="text-2xl font-bold">Devices</h2>
          {random_jdfjudu8d8f.map((device, index) => (
            <div
              className={`${
                device.id === deviceSelected ? "bg-blue-200" : "bg-white"
              } border-2 border-blue-600 p-2 rounded-md cursor-pointer`}
              key={index}
              onClick={() => {
                console.log(device.id);
                setDeviceSelected(device.id);
              }}
            >
              <EnvironmentFilled />
              <span>{device.name}</span>
            </div>
          ))}
          <Button>+ Add device</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 w-full border border-gray-200">
        <div className="flex items-center mb-4 gap-x-4">
          <h2 className="text-2xl font-bold">Sensor value</h2>
          {areas.map((area) => (
            <div key={area.areaId} onClick={() => setAreaSelected(area.areaId)}>
              <Area
                areaId={area.areaId}
                selected={area.areaId === areaSelected}
              />
            </div>
          ))}
        </div>

        {/* <h1 className="text-3xl font-bold text-gray-800 mb-5">Sensors</h1> */}
        <div className="flex justify-around items-center flex-wrap gap-4 mb-8">
          {sensor.map((item) => (
            <SensorCard
              key={item.id}
              value={item.value}
              unit={item.unit}
              label={item.label}
              color={item.color}
            />
          ))}
        </div>
      </div>

      <Modal
        open={showForm}
        // onOk={handleSubmit}
        // isLoading={isLoading}
        centered
        onCancel={handleCancel}
        footer={<></>}
      >
        <ScheduleForm key={editId} />
      </Modal>

      <div className="flex flex-col md:flex-row justify-between gap-8 border border-gray-200">
        <div className="bg-white rounded-lg shadow-md p-5 w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Schedules</h2>
            <Button
              onClick={() => {
                dispatch(setEditId(-1));
                dispatch(setShowForm(true));
              }}
            >
              <PlusOutlined />
              <span className="ml-1">Create</span>
            </Button>
          </div>
          <div className="flex flex-wrap mb-4">
            {schedules.map((schedule) => (
              <div className="w-6/12" key={schedule.id}>
                <Schedule {...schedule} />
              </div>
            ))}
          </div>
          <Pagination
            align="end"
            pageSize={4}
            onChange={(page, pageSize) => {
              dispatch(getSchedules([page, pageSize]));
              dispatch(setCurrentPage(page));
            }}
            current={currentPage}
            total={totalSchedule}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
