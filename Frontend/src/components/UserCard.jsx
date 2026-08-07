function UserCard({
  user,
  onDelete,
}) {

  const roleColor =
    user.role === "Admin"
      ? "bg-indigo-100 text-indigo-700"
      : "bg-gray-100 text-gray-700";

  const statusColor =
    user.status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (

    <div className="bg-white rounded-2xl shadow p-6 border hover:shadow-lg transition">

      <div>

        <h2 className="text-xl font-bold text-gray-800">
          {user.name}
        </h2>

        <p className="text-gray-500 mt-1">
          {user.email}
        </p>

      </div>

      <div className="flex gap-3 mt-5">

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${roleColor}`}
        >
          {user.role}
        </span>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
        >
          {user.status}
        </span>

      </div>

      <div className="mt-6">

        <p className="text-sm text-gray-500">
          Member Since
        </p>

        <p className="font-semibold text-gray-700">
          {
            user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"
          }
        </p>

      </div>

      {/* Delete Button */}
      <div className="mt-6">

        <button
          onClick={() => onDelete(user._id)}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition"
        >
          Delete User
        </button>

      </div>

    </div>

  );

}

export default UserCard;