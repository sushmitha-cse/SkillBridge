const { z } = require("zod");

const createBookingSchema = z
  .object({
    mentorId: z
      .number()
      .int()
      .positive("Mentor ID must be a positive number"),

    startTime: z
      .string()
      .datetime("Invalid start time"),

    endTime: z
      .string()
      .datetime("Invalid end time"),

    notes: z
      .string()
      .max(1000, "Notes are too long")
      .optional(),
  })
  .refine(
    (data) => new Date(data.endTime) > new Date(data.startTime),
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

const updateBookingStatusSchema = z.object({
  status: z.enum([
    "ACCEPTED",
    "REJECTED",
    "COMPLETED",
    "CANCELLED",
  ]),
});

module.exports = {
  createBookingSchema,
  updateBookingStatusSchema,
};
