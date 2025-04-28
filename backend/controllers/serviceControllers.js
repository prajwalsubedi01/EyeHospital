const Service = require('../models/Service');

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
// In your service controller
exports.createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url; // This gives full Cloudinary URL
    }

    const service = new Service({ title, description, image: imageUrl });
    await service.save();
    
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update service
exports.updateService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updates = { title, description };

    if (req.file) {
      updates.image = req.file.filename;

    }

    const updated = await Service.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
