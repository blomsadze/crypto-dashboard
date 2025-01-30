import React, { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type TProps = {
  chartData: { x: string; y: number }[];
};

const Chart: FC<TProps> = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    datasets: [
      {
        data: chartData,
        fill: false,
        borderColor: "#FACC15",
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} options={options} height="100%" />;
};

export { Chart };
