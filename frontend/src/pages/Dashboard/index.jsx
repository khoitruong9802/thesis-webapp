// Import necessary libraries and CSS
import SensorCard from "../../components/SensorCard";
import Schedule from "../../components/Schedule";

const sensor = [
  {
    value: 28.5,
    unit: "°C",
    label: "Soil temperature",
    color: "text-red-600",
  },
  {
    value: 65.2,
    unit: "%",
    label: "Soil humidity",
    color: "text-blue-600",
  },
  {
    value: 40.2,
    unit: "mg/kg",
    label: "Soil nitrogen",
    color: "text-indigo-600",
  },
  {
    value: 20.3,
    unit: "mg/kg",
    label: "Soil phosphorus",
    color: "text-indigo-600",
  },
  {
    value: 15.5,
    unit: "mg/kg",
    label: "Soil potassium",
    color: "text-indigo-600",
  },
];

const schedules = [
  {
    scheduleName: "Lịch tưới cam",
    startTime: "12:00",
    stopTime: "13:00",
    flow1: 12,
    flow2: 12,
    flow3: 12,
  },
  {
    scheduleName: "Lịch tưới bưởi",
    startTime: "13:00",
    stopTime: "14:00",
    flow1: 12,
    flow2: 12,
    flow3: 12,
  },
  {
    scheduleName: "Lịch tưới mận",
    startTime: "13:00",
    stopTime: "14:00",
    flow1: 12,
    flow2: 12,
    flow3: 12,
  },
  {
    scheduleName: "Lịch tưới đào",
    startTime: "13:00",
    stopTime: "14:00",
    flow1: 12,
    flow2: 12,
    flow3: 12,
  },
];

function Dashboard() {
  return (
    <div className="flex gap-8 flex-col h-screen p-4 relative">
      <div className="bg-white rounded-lg shadow-md p-4 w-full border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Sensor value</h2>

        {/* <h1 className="text-3xl font-bold text-gray-800 mb-5">Sensors</h1> */}
        <div className="flex justify-around items-center flex-wrap gap-4 mb-8">
          {sensor.map((item, index) => (
            <SensorCard
              key={index}
              value={item.value}
              unit={item.unit}
              label={item.label}
              color={item.color}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-8 border border-gray-200">
        <div className="bg-white rounded-lg shadow-md p-5 w-full">
          <h2 className="text-2xl font-bold mb-4">Schedules</h2>
          <div className="flex flex-col gap-y-2">
            {schedules.map((item, index) => (
              <Schedule key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
