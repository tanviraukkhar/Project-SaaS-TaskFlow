const Notification = require("../models/Notification");

/**
 * Create a notification
 * @param {Object} data
 * @param {String} data.user
 * @param {String} data.title
 * @param {String} data.message
 * @param {String} data.type
 * @param {String} data.project
 * @param {String} data.task
 */

const createNotification = async ({
  user,
  title,
  message,
  type = "system",
  project = null,
  task = null,
}) => {
  try {
    const notification = await Notification.create({
      user,
      title,
      message,
      type,
      project,
      task,
    });

    return notification;
  } catch (error) {
    console.error("❌ Failed to create notification:", error.message);
    return null;
  }
};

module.exports = createNotification;