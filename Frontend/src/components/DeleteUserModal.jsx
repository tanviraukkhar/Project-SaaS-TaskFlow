function DeleteUserModal({
  isOpen,
  onClose,
  onConfirm,
}) {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">

        <h2 className="text-2xl font-bold text-gray-800">
          Delete User
        </h2>

        <p className="text-gray-500 mt-3">
          Are you sure you want to delete this user?
        </p>

        <div className="flex gap-3 mt-6">

          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteUserModal;