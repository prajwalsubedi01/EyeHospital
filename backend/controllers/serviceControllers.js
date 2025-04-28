const Service = require('../models/Service');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    // Transform image URLs to full Cloudinary URLs
    const transformedServices = services.map(service => ({
      ...service._doc,
      image: service.image.startsWith('http') ? service.image : 
            `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${service.image}`
    }));
    res.json(transformedServices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file; // multer saves file here

    // Validate inputs
    if (!title || !description || !file) {
      return res.status(400).json({ error: 'Title, description, and image are required' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'services',
    });

    // Save new service
    const newService = new Service({
      title,
      description,
      image: result.public_id, // or result.secure_url if you want full URL
    });

    const savedService = await newService.save();

    // Remove temporary file after upload
    fs.unlinkSync(file.path);

    res.status(201).json(savedService);

  } catch (error) {
    console.error('Error in createService:', error);
    if (req.file) fs.unlinkSync(req.file.path); // Clean up temp file if error
    res.status(500).json({ error: 'An error occurred while creating the service' });
  }
};
// Update service
exports.updateService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updates = { title, description };

    if (req.file) {
      // First delete old image if exists
      const oldService = await Service.findById(req.params.id);
      if (oldService.image && oldService.image.startsWith('http')) {
        const publicId = oldService.image.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'services'
      });
      updates.image = result.secure_url;
      // Remove the temporary file
      fs.unlinkSync(req.file.path);
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { new: true }
    );
    
    res.json(updated);
  } catch (err) {
    console.error('Error updating service:', err);
    if (req.file) fs.unlinkSync(req.file.path); // Clean up if error occurs
    res.status(500).json({ message: err.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (service.image && service.image.startsWith('http')) {
      const publicId = service.image.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }
    
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ message: err.message });
  }
};