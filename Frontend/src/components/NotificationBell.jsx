import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";

import NotificationDropdown from "./NotificationDropdown";

import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notificationService";

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);

  // ===============================
  // Load Notifications
  // ===============================
  const loadNotifications = async () => {
    try {
      setLoading(true);

      const data = await getNotifications();

      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Load Unread Count
  // ===============================
  const loadUnreadCount = async () => {
    try {
      const data = await getUnreadCount();

      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error("Failed to load unread count:", error);
    }
  };

  // ===============================
  // First Load
  // ===============================
  useEffect(() => {
    loadNotifications();
    loadUnreadCount();
  }, []);

  // ===============================
  // Close Dropdown When Clicking Outside
  // ===============================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ===============================
  // Mark Single Notification As Read
  // ===============================
  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);

      await loadNotifications();
      await loadUnreadCount();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // ===============================
  // Mark All Notifications As Read
  // ===============================
  const handleMarkAll = async () => {
    try {
      await markAllAsRead();

      await loadNotifications();
      await loadUnreadCount();
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  // ===============================
  // Delete Notification
  // ===============================
  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

      await loadNotifications();
      await loadUnreadCount();
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Notification Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-gray-100
          transition
          hover:bg-gray-200
          dark:bg-slate-800
          dark:hover:bg-slate-700
        "
        aria-label="Notifications"
      >
        <Bell
          size={20}
          className="text-gray-700 dark:text-gray-200"
        />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-[18px]
              min-w-[18px]
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-bold
              text-white
            "
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {open && (
        <div
          className="
            fixed
            left-2
            right-2
            top-16
            z-50
            w-auto
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-2xl
            dark:border-slate-700
            dark:bg-slate-900

            sm:absolute
            sm:left-auto
            sm:right-0
            sm:top-full
            sm:mt-2
            sm:w-[380px]
          "
        >
          <NotificationDropdown
            loading={loading}
            notifications={notifications}
            onRead={handleMarkAsRead}
            onDelete={handleDelete}
            onMarkAll={handleMarkAll}
          />
        </div>
      )}
    </div>
  );
}

export default NotificationBell;