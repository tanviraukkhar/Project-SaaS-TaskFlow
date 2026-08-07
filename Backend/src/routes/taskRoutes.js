const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/taskController");


// ===============================
// Get All Tasks
// ===============================
router.get(
  "/",
  protect,
  getTasks
);


// ===============================
// Get Single Task
// ===============================
router.get(
  "/:id",
  protect,
  getTaskById
);


// ===============================
// Create Task
// ===============================
router.post(
  "/",
  protect,
  createTask
);


// ===============================
// Update Full Task
// ===============================
router.put(
  "/:id",
  protect,
  updateTask
);


// ===============================
// Update Task Status
// Employee Start / Complete Task
// ===============================
router.patch(
  "/:id/status",
  protect,
  updateTaskStatus
);


// ===============================
// Delete Task
// ===============================
router.delete(
  "/:id",
  protect,
  deleteTask
);


module.exports = router;