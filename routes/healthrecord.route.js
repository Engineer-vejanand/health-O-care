const express = require('express');//healthrecords route
const router = express.Router();
const healthRecordController = require("../controllers/healthrecord.controller.js");
const upload = require("../middlewares/multer.middleware.js");
const isLoggedin = require("../middlewares/isLoggedin.middeleware.js")

router.get('/',isLoggedin, healthRecordController.viewRecords);

router.post('/upload', isLoggedin,upload.single('file'), healthRecordController.uploadRecord);

router.get('/download/:id', isLoggedin,healthRecordController.downloadRecord);

router.post('/delete/:id',isLoggedin, healthRecordController.deleteRecord);

router.post('/update-status/:id', healthRecordController.updateHealthRecordStatus);

module.exports = router;
