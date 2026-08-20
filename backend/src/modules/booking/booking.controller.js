const {
  createBooking,
  getStudentBookings,
  getMentorBookings,
  updateBookingStatus,
  cancelBooking,
  updateMeetingLink,
} = require("./booking.service");

const {
  createBookingSchema,
  updateBookingStatusSchema,
  updateMeetingLinkSchema,
} = require("./booking.validation");

// Student creates a booking
async function create(req, res) {
  try {
    const validatedData = createBookingSchema.parse({
      ...req.body,
      mentorId: Number(req.body.mentorId),
    });

    const booking = await createBooking(
      req.user.userId,
      validatedData
    );

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Student gets own bookings
async function getMyBookings(req, res) {
  try {
    const bookings = await getStudentBookings(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Student bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("Get student bookings error:", error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

// Mentor gets own bookings
async function getMentorBookingsController(req, res) {
  try {
    const bookings = await getMentorBookings(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Mentor bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("Get mentor bookings error:", error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

// Mentor updates booking status
async function updateStatus(req, res) {
  try {
    const bookingId = Number(req.params.id);

    if (Number.isNaN(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const validatedData = updateBookingStatusSchema.parse(req.body);

    const booking = await updateBookingStatus(
      req.user.userId,
      bookingId,
      validatedData.status
    );

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Update booking status error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Student cancels booking
async function cancel(req, res) {
  try {
    const bookingId = Number(req.params.id);

    if (Number.isNaN(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await cancelBooking(
      req.user.userId,
      bookingId
    );

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Cancel booking error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Mentor adds meeting link
async function addMeetingLink(req, res) {
  try {
    const bookingId = Number(req.params.id);

    if (Number.isNaN(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const validatedData = updateMeetingLinkSchema.parse(req.body);

    const booking = await updateMeetingLink(
      req.user.userId,
      bookingId,
      validatedData.meetingLink
    );

    return res.status(200).json({
      success: true,
      message: "Meeting link added successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Add meeting link error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  create,
  getMyBookings,
  getMentorBookingsController,
  updateStatus,
  cancel,
  addMeetingLink,
};
