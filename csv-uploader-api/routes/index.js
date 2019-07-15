const express = require('express');
const router = express.Router();

var upload = require('../controllers/uploadController');

router.post('/upload', upload.csvUpload);
router.get('/suggestions?', upload.getSuggestions);
router.post('/status', upload.getStatus);
router.post('/search', upload.getSearchResults);
module.exports = router;
