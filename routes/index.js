const express = require('express');
const router = express.Router();

var upload = require('../controllers/uploadController');

router.post('/upload', upload.csvUpload);

module.exports = router;
