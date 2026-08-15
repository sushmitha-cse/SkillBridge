const prisma = require("../../config/prisma");

// Get all mentors
async function getAllMentors() {
  const mentors = await prisma.mentor.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      skills: {
        include: {
          skill: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return mentors;
}

// Get one mentor by ID
async function getMentorById(id) {
  const mentor = await prisma.mentor.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  if (!mentor) {
    throw new Error("Mentor not found");
  }

  return mentor;
}

// Get mentor profile using logged-in user's ID
async function getMentorByUserId(userId) {
  const mentor = await prisma.mentor.findUnique({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  return mentor;
}

// Update mentor profile
async function updateMentorProfile(userId, data) {
  const mentor = await prisma.mentor.findUnique({
    where: {
      userId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  const updatedMentor = await prisma.mentor.update({
    where: {
      userId,
    },
    data: {
      bio: data.bio,
      experience: data.experience,
      hourlyRate: data.hourlyRate,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  return updatedMentor;
}

// Add a skill to mentor
async function addMentorSkill(userId, skillId) {
  const mentor = await prisma.mentor.findUnique({
    where: {
      userId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  // Check whether skill exists
  const skill = await prisma.skill.findUnique({
    where: {
      id: skillId,
    },
  });

  if (!skill) {
    throw new Error("Skill not found");
  }

  // Check whether mentor already has this skill
  const existingMentorSkill = await prisma.mentorSkill.findUnique({
    where: {
      mentorId_skillId: {
        mentorId: mentor.id,
        skillId,
      },
    },
  });

  if (existingMentorSkill) {
    throw new Error("Mentor already has this skill");
  }

  const mentorSkill = await prisma.mentorSkill.create({
    data: {
      mentorId: mentor.id,
      skillId,
    },
    include: {
      skill: true,
    },
  });

  return mentorSkill;
}

// Remove a skill from mentor
async function removeMentorSkill(userId, skillId) {
  const mentor = await prisma.mentor.findUnique({
    where: {
      userId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  const mentorSkill = await prisma.mentorSkill.findUnique({
    where: {
      mentorId_skillId: {
        mentorId: mentor.id,
        skillId,
      },
    },
  });

  if (!mentorSkill) {
    throw new Error("Mentor does not have this skill");
  }

  await prisma.mentorSkill.delete({
    where: {
      mentorId_skillId: {
        mentorId: mentor.id,
        skillId,
      },
    },
  });

  return {
    message: "Skill removed from mentor successfully",
  };
}

module.exports = {
  getAllMentors,
  getMentorById,
  getMentorByUserId,
  updateMentorProfile,
  addMentorSkill,
  removeMentorSkill,
};
