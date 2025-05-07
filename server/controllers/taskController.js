const Robot = require('../models/Robot');
const RobotStatus = require('../models/RobotStatus');

exports.getCurrentTask = async (req, res) => {
    const { deviceId } = req.params;

    try {
        const robot = await Robot.findOne({ deviceId });
        if (!robot || !robot.ip) {
            return res.status(404).json({ message: 'Robot not found or IP missing' });
        }

        const espUrl = `http://${robot.ip}/current-task`;

        const response = await fetch(espUrl);
        const data = await response.json();

        if (response.ok) {
            // Assume `data.task` contains `status` and `stockId`
            const { status, stockId } = data.task;

            // Save the fetched task info to RobotStatus
            await RobotStatus.create({
                deviceId,
                stockId,
                status,
                fetchedAt: new Date()
            });

            res.status(200).json({
                message: 'Current task fetched and stored successfully',
                task: data.task
            });
        } else {
            res.status(500).json({ message: 'Failed to fetch task from ESP', error: data });
        }
    } catch (error) {
        console.error('Error fetching current task:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
