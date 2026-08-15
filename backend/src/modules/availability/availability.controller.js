const availabilityService = require("./availability.service");

const {
  createAvailabilitySchema,
  updateAvailabilitySchema,
} = require("./availability.validation");

// Create availability
async function createAvailability(req, res) {
  try {
    const data = createAvailabilitySchema.parse(req.body);

    const availability = await availabilityService.createAvailability(
      req.user.userId,
      data
    );

    return res.status(201).json({
      success: true,
      message: "Availability created successfully",
      data: availability,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Get my availability
async function getMyAvailability(req, res) {
  try {
    const availability = await availabilityService.getMyAvailability(
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      message: "My availability fetched successfully",
      data: availability,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Get a mentor's availability
async function getMentorAvailability(req, res) {
  try {
    const mentorId = Number(req.params.mentorId);

    if (!Number.isInteger(mentorId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mentor ID",
      });
    }

    const availability =
      await availabilityService.getMentorAvailability(mentorId);

    return res.status(200).json({
      success: true,
      message: "Mentor availability fetched successfully",
      data: availability,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Update availability
async function updateAvailability(req, res) {
  try {
    const availabilityId = Number(req.params.id);

    if (!Number.isInteger(availabilityId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid availability ID",
      });
    }

    const data = updateAvailabilitySchema.parse(req.body);

    const availability =
      await availabilityService.updateAvailability(
        req.user.userId,
        availabilityId,
        data
      );

    return res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      data: availability,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Delete availability
async function deleteAvailability(req, res) {
  try {
    const availabilityId = Number(req.params.id);

    if (!Number.isInteger(availabilityId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid availability ID",
      });
    }

    await availabilityService.deleteAvailability(
      req.user.userId,
      availabilityId
    );

    return res.status(200).json({
      success: true,
      message: "Availability deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createAvailability,
  getMyAvailability,
  getMentorAvailability,
  updateAvailability,
  deleteAvailability,
};
