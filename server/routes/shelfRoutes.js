// routes/shelfRoutes.js
const express = require('express');
const router = express.Router();
const {
  configureShelfDevice,
  addShelfSpace,
  updateShelfIp
} = require('../controllers/shelfController');

router.post('/configure-device', configureShelfDevice);
router.post('/shelf/space',             addShelfSpace);
router.post('/update-ip',         updateShelfIp);

module.exports = router;
