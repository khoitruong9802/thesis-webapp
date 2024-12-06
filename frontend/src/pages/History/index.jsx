import { useState, useEffect } from "react";
import ChartList from "../../components/LineChart";
import { CalendarFilled } from "@ant-design/icons";
import { getScheduleHistorys } from "../../services/scheduleHistoryService";
import { convertSnakeToCamel } from "../../utils/helper";

const initialChartInfo = [
  {
    chartData: [12, 53, 22, 33, 35],
    chartLabels: ["1", "2", "3", "4", "5"],
    title: "Humidity (%)",
    xAxisLabel: "Time",
    yAxisLabel: "",
    color: "blue",
  },
  {
    chartData: [12, 53, 100, 33, 35],
    chartLabels: ["1", "2", "3", "4", "5"],
    title: "Temperature (°C)",
    xAxisLabel: "Time",
    yAxisLabel: "",
    color: "red",
  },
  {
    chartData: [12, 53, 100, 33, 35],
    chartLabels: ["1", "2", "3", "4", "5"],
    title: "Kali (mg/kg)",
    xAxisLabel: "Time",
    yAxisLabel: "",
    color: "purple",
  },
  {
    chartData: [12, 53, 100, 33, 35],
    chartLabels: ["1", "2", "3", "4", "5"],
    title: "Nito (mg/kg)",
    xAxisLabel: "Time",
    yAxisLabel: "",
    color: "purple",
  },
  {
    chartData: [12, 53, 100, 33, 35],
    chartLabels: ["1", "2", "3", "4", "5"],
    title: "Photpho (mg/kg)",
    xAxisLabel: "Time",
    yAxisLabel: "",
    color: "purple",
  },
];

const History = () => {
  const [scheduleHistory, setScheduleHistory] = useState([]);
  const [chartInfo, setChartInfo] = useState(initialChartInfo);
  console.log(chartInfo);

  useEffect(() => {
    const fetchScheduleHistorys = async () => {
      const res = await getScheduleHistorys();
      console.log(res);
      const result = res.data.data.map((item) => convertSnakeToCamel(item));
      setScheduleHistory(result);
    };

    fetchScheduleHistorys();
  }, []);

  return (
    <div className="flex flex-col p-6 w-full min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        <CalendarFilled className="text-green-400 text-3xl" />
        History Page
      </h1>

      {/* Schedule History Table */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Schedule History
        </h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-2 text-center">ID</th>
              <th className="border border-gray-200 p-2 text-center">
                Schedule Name
              </th>
              <th className="border border-gray-200 p-2 text-center">Area</th>
              <th className="border border-gray-200 p-2 text-center">
                Start Time
              </th>
              <th className="border border-gray-200 p-2 text-center">
                Stop Time
              </th>
              <th className="border border-gray-200 p-2 text-center">Result</th>
            </tr>
          </thead>
          <tbody>
            {scheduleHistory.map((schedule, index) => (
              <tr key={schedule.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 p-2">{index + 1}</td>
                <td className="border border-gray-200 p-2">
                  {schedule.scheduleName}
                </td>
                <td className="border border-gray-200 p-2">{schedule.area}</td>
                <td className="border border-gray-200 p-2">
                  {schedule.startTime}
                </td>
                <td className="border border-gray-200 p-2">
                  {schedule.stopTime}
                </td>
                <td className="border border-gray-200 p-2">
                  {schedule.result === 1 ? (
                    <p className="bg-green-200 text-green-800 rounded-lg p-1">
                      Success
                    </p>
                  ) : (
                    <p className="bg-red-200 text-red-800 rounded-lg p-1">
                      Failure
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sensor Data Line Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Sensor Data
        </h2>
        <div className="flex flex-wrap">
          {chartInfo.map((item, index) => (
            <div key={index} className="w-6/12">
              <ChartList
                chartData={item.chartData}
                chartLabels={item.chartLabels}
                title={item.title}
                xAxisLabel={item.xAxisLabel}
                yAxisLabel={item.yAxisLabel}
                color={item.color}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
