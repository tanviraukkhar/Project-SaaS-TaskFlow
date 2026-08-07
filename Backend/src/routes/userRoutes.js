const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getUsers,
  deleteUser,
} = require("../controllers/userController");

// ===============================
// Get Users
// Admin Only
// ===============================
router.get(
  "/",
  protect,
  getUsers
);

// ===============================
// Delete User
// Admin Only
// ===============================
router.delete(
  "/:id",
  protect,
  deleteUser
);

module.exports = router;