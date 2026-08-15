const prisma = require("../../config/prisma");

async function createSkill(data) {
  const { name } = data;

  // Check if skill already exists
  const existingSkill = await prisma.skill.findUnique({
    where: {
      name,
    },
  });

  if (existingSkill) {
    throw new Error("Skill already exists");
  }

  // Create skill
  const skill = await prisma.skill.create({
    data: {
      name,
    },
  });

  return skill;
}

async function getAllSkills() {
  const skills = await prisma.skill.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return skills;
}

async function getSkillById(id) {
  const skill = await prisma.skill.findUnique({
    where: {
      id,
    },
  });

  if (!skill) {
    throw new Error("Skill not found");
  }

  return skill;
}

async function updateSkill(id, data) {
  const { name } = data;

  const existingSkill = await prisma.skill.findUnique({
    where: {
      id,
    },
  });

  if (!existingSkill) {
    throw new Error("Skill not found");
  }

  const duplicateSkill = await prisma.skill.findFirst({
    where: {
      name,
      NOT: {
        id,
      },
    },
  });

  if (duplicateSkill) {
    throw new Error("Another skill with this name already exists");
  }

  const updatedSkill = await prisma.skill.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  return updatedSkill;
}

async function deleteSkill(id) {
  const existingSkill = await prisma.skill.findUnique({
    where: {
      id,
    },
  });

  if (!existingSkill) {
    throw new Error("Skill not found");
  }

  await prisma.skill.delete({
    where: {
      id,
    },
  });

  return {
    message: "Skill deleted successfully",
  };
}

module.exports = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
