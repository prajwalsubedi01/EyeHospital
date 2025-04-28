const Notice = require("../models/Notice");
const cloudinary = require('cloudinary').v2;

// @desc    Create a new notice
// @route   POST /api/notice
// @access  Admin
const createNotice = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate required fields
        if (!title || !description) {
            return res.status(400).json({ 
                success: false,
                message: "Title and description are required" 
            });
        }

        // Create new notice
        const newNotice = new Notice({
            title,
            description,
            image: req.file ? req.file.path : null // Cloudinary URL
        });

        await newNotice.save();

        res.status(201).json({
            success: true,
            message: "Notice created successfully",
            notice: newNotice
        });

    } catch (error) {
        console.error("Error creating notice:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create notice",
            error: error.message
        });
    }
};

// @desc    Get all notices
// @route   GET /api/notice
// @access  Public
const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ createdAt: -1 }); // Newest first
        res.json({
            success: true,
            count: notices.length,
            notices
        });
    } catch (error) {
        console.error("Error fetching notices:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch notices",
            error: error.message
        });
    }
};

// @desc    Update a notice
// @route   PUT /api/notice/:id
// @access  Admin
const updateNotice = async (req, res) => {
    try {
        const { title, description } = req.body;
        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: "Notice not found"
            });
        }

        // Handle image update if new file is uploaded
        if (req.file) {
            // Delete old image from Cloudinary if exists
            if (notice.image) {
                try {
                    const publicId = notice.image.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`EyeHospitalUploads/${publicId}`);
                } catch (cloudinaryError) {
                    console.error("Error deleting old image from Cloudinary:", cloudinaryError);
                }
            }
            notice.image = req.file.path;
        }

        // Update other fields
        notice.title = title || notice.title;
        notice.description = description || notice.description;

        await notice.save();

        res.json({
            success: true,
            message: "Notice updated successfully",
            notice
        });

    } catch (error) {
        console.error("Error updating notice:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update notice",
            error: error.message
        });
    }
};

// @desc    Delete a notice
// @route   DELETE /api/notice/:id
// @access  Admin
const deleteNotice = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: "Notice not found"
            });
        }

        // Delete image from Cloudinary if exists
        if (notice.image) {
            try {
                const publicId = notice.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`EyeHospitalUploads/${publicId}`);
            } catch (cloudinaryError) {
                console.error("Error deleting image from Cloudinary:", cloudinaryError);
            }
        }

        await notice.deleteOne();

        res.json({
            success: true,
            message: "Notice deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting notice:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete notice",
            error: error.message
        });
    }
};

module.exports = {
    createNotice,
    getNotices,
    updateNotice,
    deleteNotice
};