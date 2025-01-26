const express = require('express');
const router = express.Router();
const appointmentController = require("../controllers/appoitment.controller.js");


router.get('/new', appointmentController.newAppointmentForm);
router.post('/new', appointmentController.createAppointment);
router.get('/', appointmentController.showAppointments);
router.post('/:id/cancel', appointmentController.cancelAppointment);
router.get('/:id/reschedule', appointmentController.rescheduleAppointmentForm);
router.post('/:id/reschedule', appointmentController.rescheduleAppointment);

module.exports = router;
