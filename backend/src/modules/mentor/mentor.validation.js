const { z } = require("zod");

const updateMentorProfileSchema = z.object({
  bio: z
    .string()
    .max(1000, "Bio is too long")
    .optional(),

  experience: z
    .number()
    .int()
    .min(0, "Experience cannot be negative")
    .optional(),

  hourlyRate: z
    .number()
    .min(0, "Hourly rate cannot be negative")
    .optional(),
});

const addMentorSkillSchema = z.object({
  skillId: z
    .number()
    .int()
    .positive("Skill ID must be a positive number"),
});

module.exports = {
  updateMentorProfileSchema,
  addMentorSkillSchema,
};
