import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import RecentProjectCard from "../components/RecentProjectCard";
import RecentTaskCard from "../components/RecentTaskCard";
import ProgressCard from "../components/ProgressCard";
import API from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalTasks: 0,
    myTasks: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
  });

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const statsRes = await API.get("/dashboard/stats");
      setStats(statsRes.data.stats || {});

      const projectRes = await API.get("/projects");
      setProjects(projectRes.data.projects || []);

      const taskRes = await API.get("/tasks");
      setTasks(taskRes.data.tasks || []);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-4 justify-center items-center h-96">
          <div
            className="
              h-10 w-10 rounded-full
              border-2 border-slate-200 dark:border-slate-700
              border-t-indigo-600 dark:border-t-indigo-400
              animate-spin
            "
          />
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-wide">
            Loading dashboard…
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Hero Header */}
        <div
          className="
            relative overflow-hidden rounded-3xl
            bg-slate-900 dark:bg-slate-950 dark:ring-1 dark:ring-white/10
            p-8 sm:p-10 text-white shadow-2xl shadow-indigo-950/30
          "
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-3 max-w-xl text-slate-300 text-base sm:text-lg">
              Manage your projects, teams and tasks from one powerful workspace.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-5 tracking-tight">
            Overview
          </h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-5">
            {isAdmin && (
              <StatCard title="Users" value={stats.totalUsers || 0} color="indigo" />
            )}
            {isAdmin && (
              <StatCard title="Projects" value={stats.totalProjects || 0} color="green" />
            )}
            <StatCard
              title="Tasks"
              value={stats.totalTasks || stats.myTasks || 0}
              color="blue"
            />
            <StatCard title="Completed" value={stats.completedTasks || 0} color="yellow" />
            <StatCard title="In Progress" value={stats.inProgressTasks || 0} color="purple" />
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-5 tracking-tight">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {isAdmin && (
              <button
                onClick={() => navigate("/projects")}
                className="
                  group relative overflow-hidden rounded-2xl
                  bg-indigo-600 py-5 font-semibold text-white
                  shadow-lg shadow-indigo-600/20
                  transition-all duration-200
                  hover:bg-indigo-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/30
                  active:translate-y-0
                "
              >
                + Create Project
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => navigate("/tasks")}
                className="
                  group relative overflow-hidden rounded-2xl
                  bg-emerald-600 py-5 font-semibold text-white
                  shadow-lg shadow-emerald-600/20
                  transition-all duration-200
                  hover:bg-emerald-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/30
                  active:translate-y-0
                "
              >
                + Create Task
              </button>
            )}

            <button
              onClick={() => navigate("/projects")}
              className="
                rounded-2xl border border-slate-200 dark:border-slate-700
                bg-white dark:bg-slate-800 py-5 font-semibold
                text-slate-700 dark:text-slate-200 shadow-sm
                transition-all duration-200
                hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-0.5 hover:shadow-md
                active:translate-y-0
              "
            >
              View Projects
            </button>

            <button
              onClick={() => navigate("/tasks")}
              className="
                rounded-2xl border border-slate-200 dark:border-slate-700
                bg-white dark:bg-slate-800 py-5 font-semibold
                text-slate-700 dark:text-slate-200 shadow-sm
                transition-all duration-200
                hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-0.5 hover:shadow-md
                active:translate-y-0
              "
            >
              View Tasks
            </button>
          </div>
        </section>

        {/* Recent Projects */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-5 tracking-tight">
            Recent Projects
          </h2>
          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {projects.slice(0, 3).map((project) => (
                <RecentProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 py-10 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No projects found.
              </p>
            </div>
          )}
        </section>

        {/* Recent Tasks */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-5 tracking-tight">
            Recent Tasks
          </h2>
          {tasks.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {tasks.slice(0, 3).map((task) => (
                <RecentTaskCard key={task._id} task={task} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 py-10 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No tasks found.
              </p>
            </div>
          )}
        </section>

        {/* Progress */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-5 tracking-tight">
            Project Progress
          </h2>
          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {projects.slice(0, 3).map((project) => (
                <ProgressCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 py-10 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No progress available.
              </p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
