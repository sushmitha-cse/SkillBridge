const { z } = require("zod");

const createSkillSchema = z.object({
  name: z
    .string()
    .min(2, "Skill name must be at least 2 characters")
    .max(100, "Skill name is too long"),
});

const updateSkillSchema = z.object({
  name: z
    .string()
    .min(2, "Skill name must be at least 2 characters")
    .max(100, "Skill name is too long"),
});

module.exports = {
  createSkillSchema,
  updateSkillSchema,
};
