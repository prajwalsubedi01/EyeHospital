const TeamMember = require("../models/TeamMember");
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
        const { name, post, phone, facebook, whatsapp, instagram } = req.body;
        
        if (!name || !post || !req.file) {
            return res.status(400).json({ message: "Name, post and image are required" });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'EyeHospitalUploads',
            transformation: [{ width: 800, height: 800, crop: 'limit' }]
        });

        const teamMember = new TeamMember({
            name, 
            post,
            phone,
            facebook,
            whatsapp,
            instagram,
            image: result.secure_url
        });

        await teamMember.save();
        res.status(201).json({ message: "Team member added successfully", teamMember });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateTeamMember = async (req, res) => {
    try {
        const { name, post, phone, facebook, whatsapp, instagram } = req.body;
        const teamMember = await TeamMember.findById(req.params.id);

        if (!teamMember) {
            return res.status(404).json({ message: "Team member not found" });
        }

        if (req.file) {
            // Delete old image from Cloudinary if it exists
            if (teamMember.image) {
                const publicId = teamMember.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`EyeHospitalUploads/${publicId}`);
            }
            
            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'EyeHospitalUploads',
                transformation: [{ width: 800, height: 800, crop: 'limit' }]
            });
            teamMember.image = result.secure_url;
        }

        // Update fields
        teamMember.name = name || teamMember.name;
        teamMember.post = post || teamMember.post;
        teamMember.phone = phone || teamMember.phone;
        teamMember.facebook = facebook || teamMember.facebook;
        teamMember.whatsapp = whatsapp || teamMember.whatsapp;
        teamMember.instagram = instagram || teamMember.instagram;

        await teamMember.save();
        res.json({ message: "Team member updated successfully", teamMember });
    } catch (error) {
        console.error(error);
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
        if (teamMember.image) {
            const publicId = teamMember.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`EyeHospitalUploads/${publicId}`);
        }
        
        await teamMember.deleteOne();
        res.json({ message: "Team member deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getTeamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
};