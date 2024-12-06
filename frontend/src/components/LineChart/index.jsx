// LineChart.js
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required modules
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const LineChart = ({
  title,
  chartLabels,
  chartData,
  xAxisLabel = "",
  yAxisLabel = "",
  color = "blue",
}) => {
  const colorSet = {
    blue: ["rgba(75, 192, 192, 1)", "rgba(75, 192, 192, 0.2)"],
    red: ["rgba(255, 99, 132, 1)", "rgba(255, 99, 132, 0.2)"],
    purple: ["rgba(153, 102, 255, 1)", "rgba(153, 102, 255, 0.2)"],
  };
  // Sample data for the chart
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: title,
        data: chartData,
        borderColor: colorSet[color][0],
        backgroundColor: colorSet[color][1],
        borderWidth: 2,
        tension: 0.4, // Smooth line
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xAxisLabel,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
