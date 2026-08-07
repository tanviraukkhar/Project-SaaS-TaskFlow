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
      console.error(error);
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
      console.error(error);
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
  // Close Dropdown
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

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

    // ===============================
  // Mark Single Notification as Read
  // ===============================
  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);

      await loadNotifications();
      await loadUnreadCount();

    } catch (error) {
      console.error(error);
    }
  };

  // ===============================
  // Mark All Notifications as Read
  // ===============================
  const handleMarkAll = async () => {
    try {
      await markAllAsRead();

      await loadNotifications();
      await loadUnreadCount();

    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <button
        onClick={() => setOpen(!open)}
        className="
          relative
          w-10
          h-10
          rounded-full
          bg-gray-100
          dark:bg-slate-800
          hover:bg-gray-200
          dark:hover:bg-slate-700
          transition
          flex
          items-center
          justify-center
        "
      >
        <Bell
          size={20}
          className="text-gray-700 dark:text-white"
        />

        {unreadCount > 0 && (
          <span
            className="
              absolute
              -top-1
              -right-1
              min-w-[18px]
              h-[18px]
              px-1
              rounded-full
              bg-red-500
              text-white
              text-[10px]
              font-bold
              flex
              items-center
              justify-center
            "
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown
          loading={loading}
          notifications={notifications}
          onRead={handleMarkAsRead}
          onDelete={handleDelete}
          onMarkAll={handleMarkAll}
        />
      )}
    </div>
  );
}

export default NotificationBell;