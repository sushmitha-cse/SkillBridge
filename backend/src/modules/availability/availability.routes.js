const express = require("express");

const {
  createAvailability,
  getMyAvailability,
  getMentorAvailability,
  updateAvailability,
  deleteAvailability,
} = require("./availability.controller");

const {
  authenticateToken,
} = require("../../middleware/auth.middleware");

const {
  requireRole,
} = require("../../middleware/role.middleware");

const router = express.Router();

// Mentor creates availability
router.post(
  "/",
  authenticateToken,
  requireRole("MENTOR"),
  createAvailability
);

// Mentor gets their own availability
router.get(
  "/my",
  authenticateToken,
  requireRole("MENTOR"),
  getMyAvailability
);

// Anyone can view a mentor's availability
router.get(
  "/mentor/:mentorId",
  getMentorAvailability
);

// Mentor updates availability
router.patch(
  "/:id",
  authenticateToken,
  requireRole("MENTOR"),
  updateAvailability
);

// Mentor deletes availability
router.delete(
  "/:id",
  authenticateToken,
  requireRole("MENTOR"),
  deleteAvailability
);

module.exports = router;
