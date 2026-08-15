const { z } = require("zod");

const createAvailabilitySchema = z.object({
  startTime: z.string().datetime("Invalid start time"),
  endTime: z.string().datetime("Invalid end time"),
});

const updateAvailabilitySchema = z.object({
  startTime: z.string().datetime("Invalid start time").optional(),
  endTime: z.string().datetime("Invalid end time").optional(),
});

module.exports = {
  createAvailabilitySchema,
  updateAvailabilitySchema,
};
