const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET current task from ESP based on deviceId
router.get('/robot/:deviceId/task', taskController.getCurrentTask);

module.exports = router;
