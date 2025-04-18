const express = require('express');
const router = express.Router();
const { updateIp, getDeviceStatus, configureWifi } = require('../controllers/robotController');

router.post('/configure-wifi', configureWifi);
router.post('/update-ip', updateIp);
router.get('/device-status/:deviceId', getDeviceStatus);

module.exports = router;
