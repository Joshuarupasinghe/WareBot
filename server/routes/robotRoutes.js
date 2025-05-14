const express = require('express');
const router = express.Router();
const { updateIp, getDeviceStatus, configureWifi, getAverageTemperature } = require('../controllers/robotController');

router.post('/configure-wifi', configureWifi);
router.post('/update-ip', updateIp);
router.get('/device-status/:deviceId', getDeviceStatus);
router.get('/:deviceId/average-temperature', getAverageTemperature);

module.exports = router;
