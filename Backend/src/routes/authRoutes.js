const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/authController");


// ===============================
// Authentication
// ===============================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);


// ===============================
// Profile
// ===============================

// Get Logged In User
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

// Change Password
router.put("/change-password", protect, changePassword);


// ===============================
// Current User
// ===============================
router.get("/me", protect, (req, res) => {

  res.status(200).json({

    success: true,

    user: req.user,

  });

});

module.exports = router;