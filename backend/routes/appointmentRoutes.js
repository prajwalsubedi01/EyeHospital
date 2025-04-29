const express = require('express');
const { 
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment
} = require('../controllers/appointmentControllers');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/', upload.single('image'), createAppointment);
router.get('/', getAppointments);
router.put('/:id/status', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);

module.exports = router;