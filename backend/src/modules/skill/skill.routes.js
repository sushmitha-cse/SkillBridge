const express = require("express");

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("./skill.controller");

const {
  authenticateToken,
} = require("../../middleware/auth.middleware");

const {
  requireRole,
} = require("../../middleware/role.middleware");

const router = express.Router();

// Public routes
router.get("/", getAll);

router.get("/:id", getById);

// Admin-only routes
router.post(
  "/",
  authenticateToken,
  requireRole("ADMIN"),
  create
);

router.put(
  "/:id",
  authenticateToken,
  requireRole("ADMIN"),
  update
);

router.delete(
  "/:id",
  authenticateToken,
  requireRole("ADMIN"),
  remove
);

module.exports = router;
