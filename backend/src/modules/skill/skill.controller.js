const {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} = require("./skill.service");

const {
  createSkillSchema,
  updateSkillSchema,
} = require("./skill.validation");

async function create(req, res) {
  try {
    const validatedData = createSkillSchema.parse(req.body);

    const skill = await createSkill(validatedData);

    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Create skill error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function getAll(req, res) {
  try {
    const skills = await getAllSkills();

    return res.status(200).json({
      success: true,
      message: "Skills fetched successfully",
      data: skills,
    });
  } catch (error) {
    console.error("Get skills error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function getById(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill ID",
      });
    }

    const skill = await getSkillById(id);

    return res.status(200).json({
      success: true,
      message: "Skill fetched successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Get skill error:", error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

async function update(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill ID",
      });
    }

    const validatedData = updateSkillSchema.parse(req.body);

    const skill = await updateSkill(id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Update skill error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function remove(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill ID",
      });
    }

    const result = await deleteSkill(id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Delete skill error:", error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
