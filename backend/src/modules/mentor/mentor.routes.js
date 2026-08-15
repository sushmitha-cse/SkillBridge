const express = require("express");

const {
  getAll,
  getById,
  getMyProfile,
  updateProfile,
  addSkill,
  removeSkill,
} = require("./mentor.controller");

const {
  authenticateToken,
} = require("../../middleware/auth.middleware");

const {
  requireRole,
} = require("../../middleware/role.middleware");

const router = express.Router();

// Public routes

// Get all mentors
router.get("/", getAll);

// Get mentor by ID
router.get("/:id", getById);

// Mentor-only routes

// Get logged-in mentor's profile
router.get(
  "/me/profile",
  authenticateToken,
  requireRole("MENTOR"),
  getMyProfile
);

// Update logged-in mentor's profile
router.put(
  "/profile",
  authenticateToken,
  requireRole("MENTOR"),
  updateProfile
);

// Add skill to logged-in mentor
router.post(
  "/skills",
  authenticateToken,
  requireRole("MENTOR"),
  addSkill
);

// Remove skill from logged-in mentor
router.delete(
  "/skills/:skillId",
  authenticateToken,
  requireRole("MENTOR"),
  removeSkill
);

module.exports = router;
