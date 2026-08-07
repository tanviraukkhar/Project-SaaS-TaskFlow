import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function TaskStatusChart({
  completed,
  pending,
}) {

  const data = {

    labels: [
      "Completed",
      "Pending",
    ],

    datasets: [
      {
        data: [
          completed,
          pending,
        ],

        backgroundColor: [
          "#22c55e",
          "#f59e0b",
        ],

        borderWidth: 1,
      },
    ],
  };

  const options = {

    responsive: true,

    plugins: {

      legend: {

        position: "bottom",

      },

    },

  };

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Task Status
      </h2>

      <Pie
        data={data}
        options={options}
      />

    </div>

  );

}

export default TaskStatusChart;