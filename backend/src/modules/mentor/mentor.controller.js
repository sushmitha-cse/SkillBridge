const {
  getAllMentors,
  getMentorById,
  getMentorByUserId,
  updateMentorProfile,
  addMentorSkill,
  removeMentorSkill,
} = require("./mentor.service");

const {
  updateMentorProfileSchema,
  addMentorSkillSchema,
} = require("./mentor.validation");

// Get all mentors
async function getAll(req, res) {
  try {
    const mentors = await getAllMentors();

    return res.status(200).json({
      success: true,
      message: "Mentors fetched successfully",
      data: mentors,
    });
  } catch (error) {
    console.error("Get mentors error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Get mentor by ID
async function getById(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mentor ID",
      });
    }

    const mentor = await getMentorById(id);

    return res.status(200).json({
      success: true,
      message: "Mentor fetched successfully",
      data: mentor,
    });
  } catch (error) {
    console.error("Get mentor error:", error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

// Get logged-in mentor profile
async function getMyProfile(req, res) {
  try {
    const mentor = await getMentorByUserId(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Mentor profile fetched successfully",
      data: mentor,
    });
  } catch (error) {
    console.error("Get mentor profile error:", error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

// Update logged-in mentor profile
async function updateProfile(req, res) {
  try {
    const validatedData = updateMentorProfileSchema.parse(req.body);

    const mentor = await updateMentorProfile(
      req.user.userId,
      validatedData
    );

    return res.status(200).json({
      success: true,
      message: "Mentor profile updated successfully",
      data: mentor,
    });
  } catch (error) {
    console.error("Update mentor profile error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Add skill to logged-in mentor
async function addSkill(req, res) {
  try {
    const validatedData = addMentorSkillSchema.parse({
      skillId: Number(req.body.skillId),
    });

    const mentorSkill = await addMentorSkill(
      req.user.userId,
      validatedData.skillId
    );

    return res.status(201).json({
      success: true,
      message: "Skill added to mentor successfully",
      data: mentorSkill,
    });
  } catch (error) {
    console.error("Add mentor skill error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Remove skill from logged-in mentor
async function removeSkill(req, res) {
  try {
    const skillId = Number(req.params.skillId);

    if (Number.isNaN(skillId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill ID",
      });
    }

    const result = await removeMentorSkill(
      req.user.userId,
      skillId
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Remove mentor skill error:", error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getAll,
  getById,
  getMyProfile,
  updateProfile,
  addSkill,
  removeSkill,
};
