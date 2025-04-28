const Gallery = require('../models/Gallery');

const createPhoto = async (req, res) => {
  try {
    const newImage = new Gallery({
      imageUrl: req.file.path,
    });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

const getPhotos = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const img = await Gallery.findById(req.params.id);
    if (!img) return res.status(404).json({ message: 'Image not found' });

    await img.deleteOne();
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete image' });
  }
};

module.exports = { createPhoto, getPhotos, deletePhoto };
