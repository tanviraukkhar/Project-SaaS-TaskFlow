
import { CheckCheck, Trash2 } from "lucide-react";

function NotificationDropdown({
  loading,
  notifications,
  onRead,
  onDelete,
  onMarkAll,
}) {
  return (
    <div className="w-[calc(100vw-16px)] max-w-sm sm:w-96 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Notifications
        </h3>

        {notifications.length > 0 && (
          <button
            type="button"
            onClick={onMarkAll}
            className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Mark all
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="p-6 text-center text-sm text-gray-500">
          Loading notifications...
        </div>
      )}

      {/* Empty */}
      {!loading && notifications.length === 0 && (
        <div className="p-6 text-center text-sm text-gray-500">
          No notifications found.
        </div>
      )}

      {/* Notification List */}
      {!loading && notifications.length > 0 && (
        <div className="max-h-[70vh] sm:max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-3 sm:p-4 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition ${
                !notification.isRead
                  ? "bg-indigo-50 dark:bg-slate-800/60"
                  : ""
              }`}
            >
              <div className="flex items-start gap-2 sm:gap-3">

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white break-words">
                    {notification.title}
                  </h4>

                  <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 break-words">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-[10px] sm:text-xs text-gray-400 break-words">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-1 sm:gap-2 shrink-0">

                  {!notification.isRead && (
                    <button
                      type="button"
                      onClick={() => onRead(notification._id)}
                      className="p-1.5 sm:p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition"
                      title="Mark as Read"
                    >
                      <CheckCheck
                        size={18}
                        className="text-green-600"
                      />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onDelete(notification._id)}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition"
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

