const express = require('express');
const router = express.Router();
const robotStatusController = require('../controllers/robotStatusController');

// GET latest status for hardcoded deviceId "robot001"
router.get('/robot-status/latest', robotStatusController.getLatestStatusForRobot001);

module.exports = router;
