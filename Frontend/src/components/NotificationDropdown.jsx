import { CheckCheck, Trash2 } from "lucide-react";

function NotificationDropdown({
  loading,
  notifications,
  onRead,
  onDelete,
  onMarkAll,
}) {
  return (
    <div
      className="
        absolute
        right-0
        mt-3
        w-96
        bg-white
        dark:bg-slate-900
        border
        border-gray-200
        dark:border-slate-700
        rounded-xl
        shadow-xl
        z-50
        overflow-hidden
      "
    >
      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          px-4
          py-3
          border-b
          border-gray-200
          dark:border-slate-700
        "
      >
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Notifications
        </h3>

        {notifications.length > 0 && (
          <button
            onClick={onMarkAll}
            className="
              text-sm
              text-indigo-600
              hover:text-indigo-700
              font-medium
            "
          >
            Mark all
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="p-6 text-center text-gray-500">
          Loading notifications...
        </div>
      )}

      {/* Empty */}
      {!loading && notifications.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No notifications found.
        </div>
      )}

      {/* Notification List */}
      {!loading && notifications.length > 0 && (
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`
                p-4
                border-b
                border-gray-100
                dark:border-slate-700
                hover:bg-gray-50
                dark:hover:bg-slate-800
                transition
                ${
                  !notification.isRead
                    ? "bg-indigo-50 dark:bg-slate-800/60"
                    : ""
                }
              `}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {notification.title}
                  </h4>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {!notification.isRead && (
                    <button
                      onClick={() => onRead(notification._id)}
                      className="
                        p-2
                        rounded-lg
                        hover:bg-green-100
                        dark:hover:bg-green-900
                      "
                      title="Mark as Read"
                    >
                      <CheckCheck
                        size={18}
                        className="text-green-600"
                      />
                    </button>
                  )}

                  <button
                    onClick={() => onDelete(notification._id)}
                    className="
                      p-2
                      rounded-lg
                      hover:bg-red-100
                      dark:hover:bg-red-900
                    "
                    title="Delete"
                  >
                    <Trash2
                      size={18}
                      className="text-red-500"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;