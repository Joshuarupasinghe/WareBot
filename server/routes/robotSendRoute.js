const express = require('express');
const router = express.Router();
const sendToRobotController = require('../controllers/sendToRobotController');

// POST /api/robot/send/:deviceId
router.post('/robot/send/:deviceId/send-stock', sendToRobotController.sendStockRouteToRobot);

module.exports = router;
