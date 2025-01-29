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
  label: string;
  chartData: { x: string; y: number }[];
};

const Chart: FC<TProps> = ({ label, chartData }) => {
  const data = {
    datasets: [
      {
        label,
        data: chartData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
};

export { Chart };
