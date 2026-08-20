const prisma = require("../../config/prisma");

// ==========================================
// Create a booking
// ==========================================
async function createBooking(studentId, data) {
  // Check student exists
  const student = await prisma.student.findUnique({
    where: {
      userId: studentId,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  // Check mentor exists
  const mentor = await prisma.mentor.findUnique({
    where: {
      id: data.mentorId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor not found");
  }

  const startTime = new Date(data.startTime);
  const endTime = new Date(data.endTime);

  // Check for overlapping bookings
  const overlappingBooking = await prisma.booking.findFirst({
    where: {
      mentorId: data.mentorId,
      status: {
        in: ["PENDING", "ACCEPTED"],
      },
      startTime: {
        lt: endTime,
      },
      endTime: {
        gt: startTime,
      },
    },
  });

  if (overlappingBooking) {
    throw new Error(
      "Mentor is already booked for this time"
    );
  }

  const booking = await prisma.booking.create({
    data: {
      studentId: student.id,
      mentorId: data.mentorId,
      startTime,
      endTime,
      notes: data.notes,
    },

    include: {
      mentor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },

      student: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return booking;
}

// ==========================================
// Get bookings for logged-in student
// ==========================================
async function getStudentBookings(userId) {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  return prisma.booking.findMany({
    where: {
      studentId: student.id,
    },

    include: {
      mentor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },

    orderBy: {
      startTime: "desc",
    },
  });
}

// ==========================================
// Get bookings for logged-in mentor
// ==========================================
async function getMentorBookings(userId) {
  const mentor = await prisma.mentor.findUnique({
    where: {
      userId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  return prisma.booking.findMany({
    where: {
      mentorId: mentor.id,
    },

    include: {
      student: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },

    orderBy: {
      startTime: "desc",
    },
  });
}

// ==========================================
// Update booking status
// ==========================================
async function updateBookingStatus(
  userId,
  bookingId,
  status
) {
  const mentor = await prisma.mentor.findUnique({
    where: {
      userId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.mentorId !== mentor.id) {
    throw new Error(
      "You can only update your own bookings"
    );
  }

  const updatedBooking = await prisma.booking.update({
    where: {
      id: bookingId,
    },

    data: {
      status,
    },
  });

  return updatedBooking;
}

// ==========================================
// Cancel booking by student
// ==========================================
async function cancelBooking(userId, bookingId) {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.studentId !== student.id) {
    throw new Error(
      "You can only cancel your own bookings"
    );
  }

  if (booking.status === "COMPLETED") {
    throw new Error(
      "Completed booking cannot be cancelled"
    );
  }

  const updatedBooking = await prisma.booking.update({
    where: {
      id: bookingId,
    },

    data: {
      status: "CANCELLED",
    },
  });

  return updatedBooking;
}

// ==========================================
// Mentor adds meeting link
// ==========================================
async function updateMeetingLink(
  userId,
  bookingId,
  meetingLink
) {
  // Check mentor exists
  const mentor = await prisma.mentor.findUnique({
    where: {
      userId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  // Check booking exists
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Make sure this booking belongs to this mentor
  if (booking.mentorId !== mentor.id) {
    throw new Error(
      "You can only update your own bookings"
    );
  }

  // Meeting link only for accepted bookings
  if (booking.status !== "ACCEPTED") {
    throw new Error(
      "Meeting link can only be added to an accepted booking"
    );
  }

  // Update meeting link
  const updatedBooking = await prisma.booking.update({
    where: {
      id: bookingId,
    },

    data: {
      meetingLink,
    },
  });

  return updatedBooking;
}

// ==========================================
// Exports
// ==========================================
module.exports = {
  createBooking,
  getStudentBookings,
  getMentorBookings,
  updateBookingStatus,
  cancelBooking,
  updateMeetingLink,
};
