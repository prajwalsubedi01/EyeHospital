const fs = require("fs");
const path = require("path");
const Gallery = require('../models/Gallery');

// CREATE
const createPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const newPhoto = new Gallery({
      url: `http://localhost:5000/uploads/${req.file.filename}`, // ✅ Accessible URL
    });

    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
};

// READ
const getPhotos = async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get photos' });
  }
};

// UPDATE
const updatePhoto = async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id);
    if (!photo) return res.status(404).json({ error: 'Photo not found' });

    if (req.file) {
      // Delete old image file
      const oldPath = path.join(__dirname, "..", photo.url.replace("http://localhost:5000/", ""));
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      photo.url = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    await photo.save();
    res.json(photo);
  } catch (error) {
    console.error('Error updating photo:', error);
    res.status(500).json({ error: 'Failed to update photo' });
  }
};

// DELETE
const deletePhoto = async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id);
    if (!photo) return res.status(404).json({ error: 'Photo not found' });

    // Delete the image file
    const filePath = path.join(__dirname, "..", photo.url.replace("http://localhost:5000/", ""));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Photo deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete photo' });
  }
};

module.exports = { createPhoto, getPhotos, updatePhoto, deletePhoto };
