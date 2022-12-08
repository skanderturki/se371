const express = require('express');
const journalsController = require('../controllers/journalsController');

const router = express.Router();

// Get all journals route
router.get('/', journalsController.getAllJournals);

// Get all journals by quater route
router.get('/quartile/:quartile', journalsController.getAllJournalsByQuartile);


module.exports = router;