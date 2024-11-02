import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Humidity",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: data,
      options: options,
    });

    return () => {
      chartInstanceRef.current.destroy();
    };
  }, []);

  return (
    <div className="bg-white p-2 rounded-lg border-2 border-gray-200">
      <p className="text-blue-500 font-medium">HUMIDITY</p>
      <canvas ref={chartRef} />
    </div>
  );
};

const ChartList = () => {
  return (
    <div className="flex flex-col gap-y-2 p-4 bg-gray-100 rounded-lg">
      <p className="text-xl font-medium">Charts</p>
      <LineChart />
    </div>
  );
};

export default ChartList;