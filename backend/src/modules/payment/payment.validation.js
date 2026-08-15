const { z } = require("zod");

const createPaymentSchema = z.object({
  bookingId: z.number().int().positive(),
  amount: z.number().positive(),
});

const updatePaymentStatusSchema = z.object({
  status: z.enum(["PENDING", "SUCCESS", "FAILED"]),
});

module.exports = {
  createPaymentSchema,
  updatePaymentStatusSchema,
};
