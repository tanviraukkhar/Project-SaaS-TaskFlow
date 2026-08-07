import { useEffect, useState } from "react";
import API from "../api/axios";

function EditProfileModal({
  isOpen,
  onClose,
  onSave,
  profile,
}) {

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    phone: "",

    department: "",

    role: "",

    currentPassword: "",

    newPassword: "",

    confirmPassword: "",

  });




  useEffect(() => {

    if (profile) {

      setFormData({

        name: profile.name || "",

        email: profile.email || "",

        phone: profile.phone || "",

        department: profile.department || "",

        role: profile.role || "",

        currentPassword: "",

        newPassword: "",

        confirmPassword: "",

      });

    }

  }, [profile]);




  if (!isOpen) return null;




  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();

    if (

      formData.newPassword &&

      formData.newPassword !== formData.confirmPassword

    ) {

      alert("New Password and Confirm Password do not match.");

      return;

    }

    try {

      await onSave(formData);

      if (

        formData.currentPassword &&
        formData.newPassword

      ) {

        await API.put(
          "/auth/change-password",
          {

            currentPassword:
              formData.currentPassword,

            newPassword:
              formData.newPassword,

          }
        );

        alert(
          "Password changed successfully."
        );

      }

      onClose();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong."
      );

    }

  };




  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold mb-6">

          Edit Profile

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
            value={formData.email}
            readOnly
            className="w-full border rounded-xl px-4 py-3 bg-gray-100"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="text"
            name="department"
            value={formData.department}
            readOnly
            className="w-full border rounded-xl px-4 py-3 bg-gray-100"
          />

          <input
            type="text"
            name="role"
            value={formData.role}
            readOnly
            className="w-full border rounded-xl px-4 py-3 bg-gray-100"
          />

          <hr />

          <h3 className="text-lg font-bold">

            Change Password

          </h3>

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <div className="flex gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 py-3 rounded-xl"
            >

              Cancel

            </button>

            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
            >

              Save Changes

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditProfileModal;