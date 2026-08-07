const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");


// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;


    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 7 characters and contain at least one uppercase letter, one lowercase letter, and one number.",
      });
    }


    // Check existing user
    const existingUser = await User.findOne({ email });


    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create user
  const user = await User.create({
  name,
  email,
  password: hashedPassword,

  phone: "",

  department: "Software Development",

  role: role || "Employee",
});

    // Generate token
    const token = generateToken(user._id);


    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Login User
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;


    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }


    // Find User
    const user = await User.findOne({ email });


    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }


    // Compare Password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );


    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }



    // Generate JWT Token
    const token = generateToken(user._id);



    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
user: {
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  department: user.department,
  role: user.role,
  status: user.status,
},
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ===============================
// Get Logged In User Profile
// ===============================
const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user._id)
      .select("-password");

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found.",

      });

    }

    res.status(200).json({

      success: true,

      user,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


// ===============================
// Update Profile
// ===============================
const updateProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found.",

      });

    }

    

    user.name =
      req.body.name ?? user.name;

    user.phone =
      req.body.phone ?? user.phone;

    user.department = req.body.department ?? user.department;

    await user.save();

    const updatedUser = await User.findById(user._id)
      .select("-password");

    res.status(200).json({

      success: true,

      message: "Profile updated successfully.",

      user: updatedUser,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


// ===============================
// Change Password
// ===============================
const changePassword = async (req, res) => {

  try {

    const {

      currentPassword,

      newPassword,

    } = req.body;

    if (!currentPassword || !newPassword) {

      return res.status(400).json({

        success: false,

        message: "Current password and new password are required.",

      });

    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 7 characters and contain at least one uppercase letter, one lowercase letter, and one number.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found.",

      });

    }

    const isMatch = await bcrypt.compare(

      currentPassword,

      user.password

    );

    if (!isMatch) {

      return res.status(400).json({

        success: false,

        message: "Current password is incorrect.",

      });

    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    res.status(200).json({

      success: true,

      message: "Password updated successfully.",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


module.exports = {

  registerUser,

  loginUser,

  getProfile,

  updateProfile,

  changePassword,

};