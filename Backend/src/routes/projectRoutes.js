const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

  createProject,

  getProjects,

  getProjectById,

  updateProject,

  deleteProject,

  getProjectMembers,

  addProjectMember,

  removeProjectMember,

} = require("../controllers/projectController");




// ===============================
// Get All Projects
// ===============================
router.get(
  "/",
  protect,
  getProjects
);




// ===============================
// Get Project Members
// ===============================
router.get(
  "/:id/members",
  protect,
  getProjectMembers
);




// ===============================
// Add Project Member
// Only Owner
// ===============================
router.post(
  "/:id/members",
  protect,
  addProjectMember
);




// ===============================
// Remove Project Member
// Only Owner
// ===============================
router.delete(
  "/:id/members/:userId",
  protect,
  removeProjectMember
);




// ===============================
// Get Single Project
// ===============================
router.get(
  "/:id",
  protect,
  getProjectById
);




// ===============================
// Create Project
// ===============================
router.post(
  "/",
  protect,
  createProject
);




// ===============================
// Update Project
// ===============================
router.put(
  "/:id",
  protect,
  updateProject
);




// ===============================
// Delete Project
// ===============================
router.delete(
  "/:id",
  protect,
  deleteProject
);



module.exports = router;