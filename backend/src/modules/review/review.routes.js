const express = require("express");

const {
  createReview,
  getMentorReviews,
  getMyReviews,
  updateReview,
  deleteReview,
} = require("./review.controller");

const {
  authenticateToken,
} = require("../../middleware/auth.middleware");

const {
  requireRole,
} = require("../../middleware/role.middleware");

const router = express.Router();

// Student creates a review
router.post(
  "/",
  authenticateToken,
  requireRole("STUDENT"),
  createReview
);

// Student gets their reviews
router.get(
  "/my",
  authenticateToken,
  requireRole("STUDENT"),
  getMyReviews
);

// Get reviews for a mentor
router.get(
  "/mentor/:mentorId",
  getMentorReviews
);

// Student updates their review
router.patch(
  "/:id",
  authenticateToken,
  requireRole("STUDENT"),
  updateReview
);

// Student deletes their review
router.delete(
  "/:id",
  authenticateToken,
  requireRole("STUDENT"),
  deleteReview
);

module.exports = router;
