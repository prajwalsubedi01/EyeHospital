const TeamMember = require("../models/TeamMember");
const fs = require("fs");

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add a new team member
// @route   POST /api/team
// @access  Admin
const addTeamMember = async (req, res) => {
  try {
    const { name, post } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !post || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const teamMember = new TeamMember({ name, post, image });
    await teamMember.save();
    res.status(201).json({ message: "Team member added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a team member
// @route   PUT /api/team/:id
// @access  Admin
const updateTeamMember = async (req, res) => {
  try {
    const { name, post } = req.body;
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    if (req.file) {
      fs.unlinkSync(`uploads/${teamMember.image}`); // Delete old image
      teamMember.image = req.file.filename;
    }

    teamMember.name = name || teamMember.name;
    teamMember.post = post || teamMember.post;

    await teamMember.save();
    res.json({ message: "Team member updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a team member
// @route   DELETE /api/team/:id
// @access  Admin
const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    fs.unlinkSync(`uploads/${teamMember.image}`); // Delete image
    await teamMember.deleteOne();
    res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Export all functions at once
module.exports = {
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
