import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import TaskStatusChart from "../components/TaskStatusChart";
import ProjectProgressChart from "../components/ProjectProgressChart";

import API from "../api/axios";

function Reports() {

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);



// ===============================
// Fetch Reports Data
// ===============================

const fetchReports = async () => {

  try {

    setLoading(true);

    if (currentUser.role === "Admin") {

      const [

        projectRes,

        taskRes,

        userRes,

      ] = await Promise.all([

        API.get("/projects"),

        API.get("/tasks"),

        API.get("/users"),

      ]);

      setProjects(projectRes.data.projects || []);
      setTasks(taskRes.data.tasks || []);
      setUsers(userRes.data.users || []);

    } else {

      const [

        projectRes,

        taskRes,

      ] = await Promise.all([

        API.get("/projects"),

        API.get("/tasks"),

      ]);

      setProjects(projectRes.data.projects || []);
      setTasks(taskRes.data.tasks || []);
      setUsers([]);

    }

  } catch (error) {

    console.log(error.response?.data?.message);

  } finally {

    setLoading(false);

  }

};

useEffect(() => {

  fetchReports();

}, []);
 






  // ===============================
  // Statistics
  // ===============================

  const completedTasks = tasks.filter(

    (task) => task.status === "Completed"

  ).length;



  const inProgressTasks = tasks.filter(

    (task) => task.status === "In Progress"

  ).length;



  const todoTasks = tasks.filter(

    (task) => task.status === "Todo"

  ).length;



  const completedProjects = projects.filter(

    (project) => project.status === "Completed"

  ).length;



  const progressPercentage =

    tasks.length > 0

      ? Math.round(

          (completedTasks / tasks.length) * 100

        )

      : 0;





  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex justify-center items-center h-[70vh]">

          <div className="text-center">

            <div className="w-14 h-14 border-4 border-gray-300 border-t-[#0F172A] rounded-full animate-spin mx-auto"></div>

            <p className="mt-4 text-gray-600 font-medium">

              Loading Reports...

            </p>

          </div>

        </div>

      </DashboardLayout>

    );

  }




  return (

    <DashboardLayout>

      <div>

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-800">

            Reports

          </h1>

          <p className="text-gray-500 mt-2">

            Workspace analytics and performance overview.

          </p>

        </div>



        {/* Statistics */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          <StatCard

            title="Projects"

            value={projects.length}

            color="indigo"

          />



          <StatCard

            title="Completed Projects"

            value={completedProjects}

            color="green"

          />



          <StatCard

            title="Tasks"

            value={tasks.length}

            color="blue"

          />



          <StatCard

            title="Completed Tasks"

            value={completedTasks}

            color="emerald"

          />



 {currentUser.role === "Admin" ? (

  <StatCard
    title="Team Members"
    value={users.length}
    color="purple"
  />

) : (

  <StatCard
    title="My Active Tasks"
    value={inProgressTasks}
    color="purple"
  />

)}



          <StatCard

            title="Completion"

            value={`${progressPercentage}%`}

            color="orange"

          />

        </div>

                {/* Progress Summary */}

        <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold text-gray-800">

                Progress Summary

              </h2>

              <p className="text-gray-500 text-sm mt-1">

                Overall workspace performance

              </p>

            </div>

            <span className="bg-[#0F172A] text-white px-4 py-2 rounded-xl font-semibold">

              {progressPercentage}%

            </span>

          </div>



          {/* Completed Tasks */}

          <div className="mb-6">

            <div className="flex justify-between mb-2">

              <span className="text-gray-600">

                Completed Tasks

              </span>

              <span className="font-semibold">

                {completedTasks}/{tasks.length}

              </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">

              <div

                className="bg-green-500 h-3 rounded-full transition-all"

                style={{

                  width: `${progressPercentage}%`

                }}

              ></div>

            </div>

          </div>



          {/* In Progress */}

          <div className="mb-6">

            <div className="flex justify-between mb-2">

              <span className="text-gray-600">

                In Progress

              </span>

              <span className="font-semibold">

                {inProgressTasks}

              </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">

              <div

                className="bg-blue-500 h-3 rounded-full"

                style={{

                  width: `${

                    tasks.length

                      ? (inProgressTasks / tasks.length) * 100

                      : 0

                  }%`

                }}

              ></div>

            </div>

          </div>



          {/* Todo */}

          <div>

            <div className="flex justify-between mb-2">

              <span className="text-gray-600">

                Todo Tasks

              </span>

              <span className="font-semibold">

                {todoTasks}

              </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">

              <div

                className="bg-yellow-500 h-3 rounded-full"

                style={{

                  width: `${

                    tasks.length

                      ? (todoTasks / tasks.length) * 100

                      : 0

                  }%`

                }}

              ></div>

            </div>

          </div>

        </div>



        {/* Charts */}

        <div className="grid xl:grid-cols-2 gap-8 mt-10">

          <TaskStatusChart

            completed={completedTasks}

            pending={todoTasks}

          />



          <ProjectProgressChart

            projects={projects}

          />

        </div>



        {/* Recent Activity */}

        <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">

            Recent Overview

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-xl bg-gray-50 p-5">

              <p className="text-gray-500 text-sm">

                Total Projects

              </p>

              <h3 className="text-3xl font-bold mt-2 text-[#0F172A]">

                {projects.length}

              </h3>

            </div>

            <div className="rounded-xl bg-gray-50 p-5">

              <p className="text-gray-500 text-sm">

                Active Tasks

              </p>

              <h3 className="text-3xl font-bold mt-2 text-blue-600">

                {inProgressTasks}

              </h3>

            </div>

    <div className="rounded-xl bg-gray-50 p-5">

  <p className="text-gray-500 text-sm">

    {currentUser.role === "Admin"
      ? "Team Members"
      : "Completed Tasks"}

  </p>

  <h3 className="text-3xl font-bold mt-2 text-purple-600">

    {currentUser.role === "Admin"
      ? users.length
      : completedTasks}

  </h3>

</div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Reports;