const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceControllers');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// CRUD routes
router.get('/', serviceController.getAllServices);
router.post('/', upload.single('image'), serviceController.createService);
router.put('/:id', upload.single('image'), serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;