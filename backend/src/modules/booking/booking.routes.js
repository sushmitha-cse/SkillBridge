const express = require("express");

const {
  create,
  getMyBookings,
  getMentorBookingsController,
  updateStatus,
  cancel,
  addMeetingLink,
} = require("./booking.controller");

const {
  authenticateToken,
} = require("../../middleware/auth.middleware");

const {
  requireRole,
} = require("../../middleware/role.middleware");

const router = express.Router();

// ===============================
// Student routes
// ===============================

// Create a booking
router.post(
  "/",
  authenticateToken,
  requireRole("STUDENT"),
  create
);

// Get my bookings
router.get(
  "/my",
  authenticateToken,
  requireRole("STUDENT"),
  getMyBookings
);

// Cancel my booking
router.patch(
  "/:id/cancel",
  authenticateToken,
  requireRole("STUDENT"),
  cancel
);

// ===============================
// Mentor routes
// ===============================

// Get bookings received by me
router.get(
  "/mentor",
  authenticateToken,
  requireRole("MENTOR"),
  getMentorBookingsController
);

// Update booking status
router.patch(
  "/:id/status",
  authenticateToken,
  requireRole("MENTOR"),
  updateStatus
);

// Add meeting link
router.patch(
  "/:id/meeting-link",
  authenticateToken,
  requireRole("MENTOR"),
  addMeetingLink
);

module.exports = router;

