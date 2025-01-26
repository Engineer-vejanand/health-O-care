const Appointment = require("../models/appointment.model.js");
const User = require("../models/user.model.js");
const Doctor = require("../models/doctor.model.js");


exports.newAppointmentForm = async (req, res) => {
  try {
    const patients = await User.find(); // Assuming all users are patients
    const doctors = await Doctor.find();
    res.render('appointmentForm', { patients, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading form.");
  }
};


exports.createAppointment = async (req, res) => {
  try {
    const { patient, doctor, date, timeSlot, notes } = req.body;
    await Appointment.create({ patient, doctor, date, timeSlot, notes });
    res.redirect('/appointments');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating appointment.");
  }
};


exports.showAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name')
      .populate('doctor', 'name specialization');
    res.render('appointments', { appointments });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching appointments.");
  }
};


exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndUpdate(id, { status: 'cancelled' });
    res.redirect('/appointments');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cancelling appointment.");
  }
};


exports.rescheduleAppointmentForm = async (req, res) => {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findById(id)
        .populate('doctor', 'name specialization')
        .populate('patient', 'name');
      if (!appointment) {
        return res.status(404).send("Appointment not found.");
      }
      res.render('rescheduleForm', { appointment });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error loading reschedule form.");
    }
  };
  

exports.rescheduleAppointment = async (req, res) => {
    try {
      const { id } = req.params;
      const { date, timeSlot } = req.body;
      const appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(404).send("Appointment not found.");
      }
      appointment.date = date;
      appointment.timeSlot = timeSlot;
      appointment.status = 'pending'; // Reset status to pending
      await appointment.save();
      res.redirect('/appointments');
    } catch (error) {
      console.error(error);
      res.status(500).send("Error rescheduling appointment.");
    }
  };
  
