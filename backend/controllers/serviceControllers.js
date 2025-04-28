const Service = require('../models/Service');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (move this to a config file in production)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new service
exports.createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrl = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'services'
      });
      imageUrl = result.secure_url;
    }

    const service = new Service({ 
      title, 
      description, 
      image: imageUrl 
    });
    
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to create service' 
    });
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
      if (oldService.image) {
        const publicId = oldService.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`services/${publicId}`);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'services'
      });
      updates.image = result.secure_url;
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { new: true }
    );
    
    res.json(updated);
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (service.image) {
      const publicId = service.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`services/${publicId}`);
    }
    
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ message: err.message });
  }
};