const express = require('express');
const router = express.Router();
const incomingAverageController = require('../controllers/incomingAverageController');

// Calculate and store incoming averages
router.post('/calculate', incomingAverageController.calculateIncomingAverages);

// Get top 5 most frequent incoming averages
router.get('/top', incomingAverageController.getTopIncomingAverages);

module.exports = router;