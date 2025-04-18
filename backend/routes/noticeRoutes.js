const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Notice = require("../models/Notice");

const router = express.Router();

// ✅ Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Create a Notice (supports text + image)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description are required" });
    }

    // Check if the image was uploaded
    const imageFilename = req.file ? req.file.filename : null;

    const newNotice = new Notice({
      title,
      description,
      image: imageFilename, // Store only the filename
    });

    await newNotice.save();
    res.status(201).json({ message: "Notice created successfully", newNotice });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Fetch all Notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Update Notice
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    let updatedData = { title, description };

    // If a new image is uploaded, replace the old one
    if (req.file) {
      const notice = await Notice.findById(req.params.id);
      if (notice.image) {
        // Delete the old image file
        fs.unlinkSync(path.join("uploads", notice.image));
      }
      updatedData.image = req.file.filename;
    }

    const updatedNotice = await Notice.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json({ message: "Notice updated", updatedNotice });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Delete Notice
router.delete("/:id", async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    // Delete the image file if it exists
    if (notice.image) {
      fs.unlinkSync(path.join("uploads", notice.image));
    }

    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
