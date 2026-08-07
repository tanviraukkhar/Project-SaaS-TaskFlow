import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ProjectProgressChart({ projects }) {

  const data = {

    labels: projects.map(
      (project) => project.title
    ),

    datasets: [

      {

        label: "Progress (%)",

        data: projects.map(
          (project) => project.progress
        ),

        backgroundColor: "#4f46e5",

        borderRadius: 8,

      },

    ],

  };



  const options = {

    responsive: true,

    plugins: {

      legend: {

        display: false,

      },

    },

    scales: {

      y: {

        beginAtZero: true,

        max: 100,

      },

    },

  };



  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Project Progress
      </h2>

      <Bar
        data={data}
        options={options}
      />

    </div>

  );

}

export default ProjectProgressChart;