import { useEffect, useState } from "react";
import API from "../api/axios";

function CreateTaskModal({ isOpen, onClose, onSave, task }) {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    priority: "Medium",
    status: "Todo",
    dueDate: "",
    assignedTo: [],
  });

  // ===============================
  // Fetch Projects
  // ===============================
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data.projects || []);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // ===============================
  // Fetch Users
  // ===============================
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchProjects();
      fetchUsers();
    }
  }, [isOpen]);

  // ===============================
  // Edit Task Data Load
  // ===============================
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        project: task.project?._id || task.project || "",
        priority: task.priority || "Medium",
        status: task.status || "Todo",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
        assignedTo:
          task.assignedTo?.map((user) => user._id) ||
          task.assignedTo ||
          [],
      });
    } else {
      setFormData({
        title: "",
        description: "",
        project: "",
        priority: "Medium",
        status: "Todo",
        dueDate: "",
        assignedTo: [],
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  // ===============================
  // Handle Change
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Multiple User Select
    if (name === "assignedTo") {
      const selectedUsers = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );

      setFormData({
        ...formData,
        assignedTo: selectedUsers,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // ===============================
  // Submit
  // ===============================
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header - fixed */}
        <h2 className="text-2xl font-bold px-6 pt-6 pb-4 text-gray-900 dark:text-white">
          {task ? "Edit Task" : "Create Task"}
        </h2>

        {/* Body - scrollable */}
        <form
          id="task-form"
          onSubmit={handleSubmit}
          className="space-y-4 px-6 overflow-y-auto flex-1"
        >
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
          />

          <select
            name="project"
            value={formData.project}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>

          {/* Assign Multiple Members */}
          <select
            multiple
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 h-32 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hold Ctrl (Windows) / Command (Mac) to select multiple members
          </p>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </form>

        {/* Footer - fixed */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-slate-600 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="task-form"
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {task ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTaskModal;