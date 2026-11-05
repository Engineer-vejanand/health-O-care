const HealthRecord = require("../models/healthrecord.model.js");//here also models
const path = require('path');
const fs = require('fs');

exports.viewRecords = async (req, res) => {
  try {
    const records = await HealthRecord.find({ user: req.user._id });
    res.render('health-records', { records });
  } catch (error) {
    console.error(error);
    res.render('health-records', { records: [] });
  }
};

exports.uploadRecord = async (req, res) => {
  try {
    const newRecord = new HealthRecord({
      user: req.user._id,
      type: req.body.recordType,
      filename: req.file.filename,
      originalName: req.file.originalname,
      date: new Date(),
    });
    await newRecord.save();
    res.redirect('/health-records');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading record.');
  }
};


exports.downloadRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id);
    if (!record || record.user.toString() !== req.user._id.toString()) {
      return res.status(403).send('Unauthorized access.');
    }
    const filePath = path.join(__dirname, '../uploads', record.filename);
    res.download(filePath, record.originalName);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error downloading file.');
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const recordId = req.params.id;

    const deletedRecord = await HealthRecord.findByIdAndDelete(recordId);
    if (!deletedRecord) {
      return res.status(404).send('Health record not found');
    }

    res.redirect('/health-records');
  } catch (error) {
    console.error('Error deleting health record:', error.message);
    res.status(500).send('Error deleting health record.');
  }
};

exports.updateHealthRecordStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body; 

    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).send('Invalid status value');
    }

    const updatedRecord = await HealthRecord.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).send('Health record not found');
    }

    res.redirect('/health-records'); 
  } catch (error) {
    console.error('Error updating health record status:', error.message);
    res.status(500).send('Error updating health record status.');
  }
};
