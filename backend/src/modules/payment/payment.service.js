const prisma = require("../../config/prisma");

async function createPayment(userId, data) {
  const { bookingId, amount } = data;

  // Find logged-in student's profile
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  // Find booking
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Check booking belongs to logged-in student
  if (booking.studentId !== student.id) {
    throw new Error("You can only pay for your own booking");
  }

  // Payment only for accepted bookings
  if (booking.status !== "ACCEPTED") {
    throw new Error(
      "Payment can only be made for an accepted booking"
    );
  }

  // Check existing payment
  const existingPayment = await prisma.payment.findUnique({
    where: {
      bookingId,
    },
  });

  if (existingPayment) {
    throw new Error("This booking has already been paid");
  }

  // Create payment
  const payment = await prisma.payment.create({
    data: {
      bookingId,
      amount,
      status: "SUCCESS",
      transactionId: `TXN-${Date.now()}`,
    },
    include: {
      booking: true,
    },
  });

  return payment;
}

async function getMyPayments(userId) {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  return prisma.payment.findMany({
    where: {
      booking: {
        studentId: student.id,
      },
    },
    include: {
      booking: {
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
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getPaymentById(userId, paymentId) {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
    include: {
      booking: true,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.booking.studentId !== student.id) {
    throw new Error(
      "You do not have permission to view this payment"
    );
  }

  return payment;
}

module.exports = {
  createPayment,
  getMyPayments,
  getPaymentById,
};
