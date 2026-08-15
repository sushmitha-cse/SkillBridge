const { z } = require("zod");

const createReviewSchema = z.object({
  bookingId: z
    .number()
    .int()
    .positive("Booking ID must be a positive number"),

  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),

  comment: z
    .string()
    .max(1000, "Comment is too long")
    .optional(),
});

const updateReviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5")
    .optional(),

  comment: z
    .string()
    .max(1000, "Comment is too long")
    .optional(),
});

module.exports = {
  createReviewSchema,
  updateReviewSchema,
};
