const reviewService = require("./review.service");
const {
  createReviewSchema,
  updateReviewSchema,
} = require("./review.validation");

// Create review
async function createReview(req, res) {
  try {
    const data = createReviewSchema.parse(req.body);

    const review = await reviewService.createReview(
      req.user.userId,
      data
    );

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Get mentor reviews
async function getMentorReviews(req, res) {
  try {
    const mentorId = Number(req.params.mentorId);

    if (!Number.isInteger(mentorId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mentor ID",
      });
    }

    const reviews = await reviewService.getMentorReviews(mentorId);

    return res.status(200).json({
      success: true,
      message: "Mentor reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Get my reviews
async function getMyReviews(req, res) {
  try {
    const reviews = await reviewService.getMyReviews(
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      message: "My reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Update review
async function updateReview(req, res) {
  try {
    const reviewId = Number(req.params.id);

    if (!Number.isInteger(reviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID",
      });
    }

    const data = updateReviewSchema.parse(req.body);

    const review = await reviewService.updateReview(
      req.user.userId,
      reviewId,
      data
    );

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Delete review
async function deleteReview(req, res) {
  try {
    const reviewId = Number(req.params.id);

    if (!Number.isInteger(reviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID",
      });
    }

    await reviewService.deleteReview(
      req.user.userId,
      reviewId
    );

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createReview,
  getMentorReviews,
  getMyReviews,
  updateReview,
  deleteReview,
};

