const prisma = require("../../config/prisma");

// Create availability
async function createAvailability(userId, data) {
  const mentor = await prisma.mentor.findUnique({
    where: {
      userId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  const startTime = new Date(data.startTime);
  const endTime = new Date(data.endTime);

  if (startTime >= endTime) {
    throw new Error("End time must be after start time");
  }

  const overlapping = await prisma.availability.findFirst({
    where: {
      mentorId: mentor.id,
      startTime: {
        lt: endTime,
      },
      endTime: {
        gt: startTime,
      },
    },
  });

  if (overlapping) {
    throw new Error("Availability overlaps with an existing slot");
  }

  return prisma.availability.create({
    data: {
      mentorId: mentor.id,
      startTime,
      endTime,
    },
  });
}

// Get mentor's own availability
async function getMyAvailability(userId) {
  const mentor = await prisma.mentor.findUnique({
    where: {
      userId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  return prisma.availability.findMany({
    where: {
      mentorId: mentor.id,
    },
    orderBy: {
      startTime: "asc",
    },
  });
}

// Get availability of a specific mentor
async function getMentorAvailability(mentorId) {
  const mentor = await prisma.mentor.findUnique({
    where: {
      id: mentorId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor not found");
  }

  return prisma.availability.findMany({
    where: {
      mentorId,
    },
    orderBy: {
      startTime: "asc",
    },
  });
}

// Update availability
async function updateAvailability(userId, availabilityId, data) {
  const mentor = await prisma.mentor.findUnique({
    where: {
      userId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  const availability = await prisma.availability.findUnique({
    where: {
      id: availabilityId,
    },
  });

  if (!availability) {
    throw new Error("Availability not found");
  }

  if (availability.mentorId !== mentor.id) {
    throw new Error("You can only update your own availability");
  }

  const startTime = data.startTime
    ? new Date(data.startTime)
    : availability.startTime;

  const endTime = data.endTime
    ? new Date(data.endTime)
    : availability.endTime;

  if (startTime >= endTime) {
    throw new Error("End time must be after start time");
  }

  const overlapping = await prisma.availability.findFirst({
    where: {
      mentorId: mentor.id,
      id: {
        not: availabilityId,
      },
      startTime: {
        lt: endTime,
      },
      endTime: {
        gt: startTime,
      },
    },
  });

  if (overlapping) {
    throw new Error("Availability overlaps with an existing slot");
  }

  return prisma.availability.update({
    where: {
      id: availabilityId,
    },
    data: {
      startTime,
      endTime,
    },
  });
}

// Delete availability
async function deleteAvailability(userId, availabilityId) {
  const mentor = await prisma.mentor.findUnique({
    where: {
      userId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  const availability = await prisma.availability.findUnique({
    where: {
      id: availabilityId,
    },
  });

  if (!availability) {
    throw new Error("Availability not found");
  }

  if (availability.mentorId !== mentor.id) {
    throw new Error("You can only delete your own availability");
  }

  return prisma.availability.delete({
    where: {
      id: availabilityId,
    },
  });
}

module.exports = {
  createAvailability,
  getMyAvailability,
  getMentorAvailability,
  updateAvailability,
  deleteAvailability,
};
