const TeamMember = require("../models/TeamMember");
const cloudinary = require('cloudinary').v2;

const getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find();
        res.json(teamMembers);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const addTeamMember = async (req, res) => {
    try {
        const { name, post } = req.body;
        
        if (!name || !post || !req.file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const teamMember = new TeamMember({
            name, 
            post, 
            image: req.file.path // Store Cloudinary URL
        });

        await teamMember.save();
        res.status(201).json({ message: "Team member added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateTeamMember = async (req, res) => {
    try {
        const { name, post } = req.body;
        const teamMember = await TeamMember.findById(req.params.id);

        if (!teamMember) {
            return res.status(404).json({ message: "Team member not found" });
        }

        if (req.file) {
            // Delete old image from Cloudinary
            const publicId = teamMember.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`EyeHospitalUploads/${publicId}`);
            
            teamMember.image = req.file.path;
        }

        teamMember.name = name || teamMember.name;
        teamMember.post = post || teamMember.post;

        await teamMember.save();
        res.json({ message: "Team member updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const deleteTeamMember = async (req, res) => {
    try {
        const teamMember = await TeamMember.findById(req.params.id);

        if (!teamMember) {
            return res.status(404).json({ message: "Team member not found" });
        }

        // Delete image from Cloudinary
        const publicId = teamMember.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`EyeHospitalUploads/${publicId}`);
        
        await teamMember.deleteOne();
        res.json({ message: "Team member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getTeamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
};