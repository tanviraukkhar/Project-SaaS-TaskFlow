import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/axios";
import AddMemberModal from "../components/AddMemberModal";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Member Modal
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  // ===============================
  // Fetch Project
  // ===============================
  const fetchProjectDetails = async () => {
    try {
      setLoading(true);

      // Get Project
      const projectRes = await API.get(`/projects/${id}`);
      setProject(projectRes.data.project);

      // Get Tasks
      const taskRes = await API.get("/tasks");
      const projectTasks = taskRes.data.tasks.filter(
        (task) => task.project?._id === id
      );
      setTasks(projectTasks);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Add Member
  // ===============================
  const handleAddMember = async (userId) => {
    try {
      await API.post(`/projects/${id}/members`, { userId });
      fetchProjectDetails();
      setIsMemberModalOpen(false);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // ===============================
  // Remove Member
  // ===============================
  const handleRemoveMember = async (userId) => {
    try {
      await API.delete(`/projects/${id}/members/${userId}`);
      fetchProjectDetails();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  // ===============================
  // Loading
  // ===============================
  if (loading) {
    return (
      <DashboardLayout>
        <h2 className="text-center text-gray-500">Loading Project...</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        {/* =============================== */}
        {/* Project Header */}
        {/* =============================== */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{project?.title}</h1>
          <p className="text-gray-500 mt-3">{project?.description}</p>

          <div className="flex flex-wrap gap-3 mt-5">
            <span className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700">
              {project?.status}
            </span>
            <span className="px-4 py-2 rounded-xl bg-red-100 text-red-700">
              {project?.priority}
            </span>
            <span className="px-4 py-2 rounded-xl bg-green-100 text-green-700">
              Progress {project?.progress || 0}%
            </span>
          </div>
        </div>

        {/* =============================== */}
        {/* Team Members */}
        {/* =============================== */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Team Members</h2>
            <button
              onClick={() => setIsMemberModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl"
            >
              + Add Member
            </button>
          </div>

          {project?.members?.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.members.map((member) => (
                <div
                  key={member._id}
                  className="border rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-700 mb-3">
                      {member.name?.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="font-bold text-gray-800">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.email}</p>
                    <span className="inline-block mt-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs">
                      {member.role}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(member._id)}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No team members added yet.</p>
            </div>
          )}
        </div>

        {/* =============================== */}
        {/* Tasks */}
        {/* =============================== */}
        <div>
          <h2 className="text-2xl font-bold mb-5">Project Tasks</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-bold">{task.title}</h3>
                  <p className="text-gray-500 mt-2">
                    {task.description || "No description"}
                  </p>
                  <div className="flex justify-between items-center mt-5">
                    <span className="text-indigo-600 font-semibold">
                      {task.priority}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No tasks found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddMemberModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        onAdd={handleAddMember}
      />
    </DashboardLayout>
  );
}

export default ProjectDetails;