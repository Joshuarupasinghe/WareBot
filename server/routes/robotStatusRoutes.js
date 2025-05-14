const express = require('express');
const router = express.Router();
const robotStatusController = require('../controllers/robotStatusController');

// GET latest status for hardcoded deviceId "robot001" (to get the current stock ID)
router.get('/robot-status/latest', robotStatusController.getLatestStatusForRobot001);

// GET detailed latest status for a specific stockId
router.get('/robot-status/:stockId/latest-detail', robotStatusController.getLatestDetailForStockId);

// GET pending stocks (with "Fetching" or "Fetching Delivery" status) for robot001
router.get('/pending-stocks', robotStatusController.getPendingStocks);

module.exports = router;