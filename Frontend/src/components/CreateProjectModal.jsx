import { useState, useEffect } from "react";
import API from "../api/axios";

function CreateProjectModal({
  isOpen,
  onClose,
  onSave,
  project,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Planning");
  const [priority, setPriority] = useState("Medium");
  const [progress, setProgress] = useState(0);
  const [deadline, setDeadline] = useState("");

  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);

  // ===============================
  // Fetch Users
  // ===============================
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.users);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setStatus(project.status || "Planning");
      setPriority(project.priority || "Medium");
      setProgress(project.progress || 0);

      setDeadline(
        project.deadline
          ? project.deadline.substring(0, 10)
          : ""
      );

      setMembers(
        project.members
          ? project.members.map((member) => member._id)
          : []
      );
    } else {
      setTitle("");
      setDescription("");
      setStatus("Planning");
      setPriority("Medium");
      setProgress(0);
      setDeadline("");
      setMembers([]);
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  // ===============================
  // Submit
  // ===============================
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("========== PROJECT SUBMIT ==========");
    console.log("Selected Members:", members);

    const projectData = {
      title,
      description,
      status,
      priority,
      progress,
      deadline,
      members,
    };

    console.log("Project Data:", projectData);

    onSave(projectData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {project ? "Edit Project" : "Create New Project"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Project Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            <option>Planning</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="number"
            min="0"
            max="100"
            placeholder="Progress %"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
          />

          {/* Members */}
          <div>
            <label className="block font-medium mb-2 text-gray-900 dark:text-white">
              Team Members
            </label>

            <select
              multiple
              value={members}
              onChange={(e) =>
                setMembers(
                  [...e.target.selectedOptions].map(
                    (option) => option.value
                  )
                )
              }
              className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 h-40 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            >
              {users.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name} ({user.role})
                </option>
              ))}
            </select>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Hold Ctrl (Windows) or Cmd (Mac) to select multiple users.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
            >
              {project ? "Update Project" : "Save Project"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default CreateProjectModal;