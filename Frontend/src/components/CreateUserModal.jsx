import { useEffect, useState } from "react";

function CreateUserModal({
  isOpen,
  onClose,
  onSave,
  user,
}) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Employee",
    status: "Active",
  });

  useEffect(() => {

    if (user) {
      setFormData(user);
    } else {
      setFormData({
        name: "",
        email: "",
        role: "Employee",
        status: "Active",
      });
    }

  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    onSave(formData);

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-5">

          {user ? "Edit User" : "Add User"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option>Admin</option>
            <option>Employee</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3 rounded-xl"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default CreateUserModal;