const express = require('express');
const router = express.Router();
const robotStatusController = require('../controllers/robotStatusController');

// GET all robot statuses (optionally filter by deviceId)
router.get('/', robotStatusController.getRobotStatuses);

module.exports = router;
