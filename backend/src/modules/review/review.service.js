const prisma = require("../../config/prisma");

// Create review
async function createReview(userId, data) {
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
      id: data.bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.studentId !== student.id) {
    throw new Error("You can only review your own booking");
  }

  if (booking.status !== "COMPLETED") {
    throw new Error("Only completed bookings can be reviewed");
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId: data.bookingId,
    },
  });

  if (existingReview) {
    throw new Error("This booking has already been reviewed");
  }

  return prisma.review.create({
    data: {
      bookingId: booking.id,
      studentId: booking.studentId,
      mentorId: booking.mentorId,
      rating: data.rating,
      comment: data.comment,
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
      booking: true,
    },
  });
}

// Get reviews for a mentor
async function getMentorReviews(mentorId) {
  const mentor = await prisma.mentor.findUnique({
    where: {
      id: mentorId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor not found");
  }

  return prisma.review.findMany({
    where: {
      mentorId,
    },
    include: {
      student: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get my reviews as a student
async function getMyReviews(userId) {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  return prisma.review.findMany({
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
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Update review
async function updateReview(userId, reviewId, data) {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.studentId !== student.id) {
    throw new Error("You can only update your own review");
  }

  return prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      ...(data.rating !== undefined && {
        rating: data.rating,
      }),
      ...(data.comment !== undefined && {
        comment: data.comment,
      }),
    },
  });
}

// Delete review
async function deleteReview(userId, reviewId) {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.studentId !== student.id) {
    throw new Error("You can only delete your own review");
  }

  return prisma.review.delete({
    where: {
      id: reviewId,
    },
  });
}

module.exports = {
  createReview,
  getMentorReviews,
  getMyReviews,
  updateReview,
  deleteReview,
};
