const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");
const Notification = require("../models/Notification");

// ===============================
// Get All Users
// Admin Only
// ===============================
const getUsers = async (req, res) => {
  try {

    // Only Admin
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Only Admin can access users list.",
      });
    }

    const users = await User.find({
      status: "Active",
    }).select(
      "name email role status phone department profileImage createdAt"
    );

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Delete User
// Admin Only
// ===============================
const deleteUser = async (req, res) => {
  try {

    // Only Admin
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Only Admin can delete users.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account.",
      });
    }

    // Remove user from all project members
    await Project.updateMany(
      {},
      {
        $pull: {
          members: user._id,
        },
      }
    );

    // Remove user from all assigned tasks
    await Task.updateMany(
      {},
      {
        $pull: {
          assignedTo: user._id,
        },
      }
    );

    // Remove activity history of this user
    await Task.updateMany(
      {},
      {
        $pull: {
          activities: {
            user: user._id,
          },
        },
      }
    );

    // Delete notifications
    await Notification.deleteMany({
      user: user._id,
    });

    // Delete user
    await User.findByIdAndDelete(user._id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getUsers,
  deleteUser,
};