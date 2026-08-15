const express = require("express");
const paymentController = require("./payment.controller");
const { authenticateToken } = require("../../middleware/auth.middleware");
const { requireRole } = require("../../middleware/role.middleware");

const router = express.Router();

// Student creates a payment
router.post(
  "/",
  authenticateToken,
  requireRole("STUDENT"),
  paymentController.createPayment
);

// Student gets their payments
router.get(
  "/my",
  authenticateToken,
  requireRole("STUDENT"),
  paymentController.getMyPayments
);

// Student gets one payment
router.get(
  "/:id",
  authenticateToken,
  requireRole("STUDENT"),
  paymentController.getPaymentById
);

module.exports = router;
