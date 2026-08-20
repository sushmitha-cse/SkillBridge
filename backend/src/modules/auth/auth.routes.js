const express = require("express");

const {
  register,
  login,
  getMe,
  updateProfile,
} = require("./auth.controller");

const {
  authenticateToken,
} = require("../../middleware/auth.middleware");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Get logged-in user's profile
router.get(
  "/me",
  authenticateToken,
  getMe
);

// Update logged-in user's profile
router.put(
  "/profile",
  authenticateToken,
  updateProfile
);

module.exports = router;

