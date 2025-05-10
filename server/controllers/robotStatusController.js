const RobotStatus = require('../models/RobotStatus');

const STOCK_STORING_FLOW = ["Fetching", "Moving to Shelf", "Placing", "Completed"];
const STOCK_DELIVERING_FLOW = ["Fetching Delivery", "Picking", "Moving to D-Zone", "Completed"];

exports.getLatestStatusForRobot001 = async (req, res) => {
  const deviceId = 'robot001';

  try {
    // Get the latest records for robot001 sorted by fetchedAt descending
    const statuses = await RobotStatus.find({ deviceId }).sort({ fetchedAt: -1 });

    if (!statuses.length) {
      return res.status(404).json({ message: 'No status found for deviceId robot001' });
    }

    const groupedByStock = {};

    for (const status of statuses) {
      if (!groupedByStock[status.stockId]) {
        groupedByStock[status.stockId] = [];
      }
      groupedByStock[status.stockId].push(status);
    }

    // Process stockIds in descending order (latest first)
    const sortedStockIds = Object.keys(groupedByStock).sort((a, b) => {
      const aTime = new Date(groupedByStock[a][0].fetchedAt).getTime();
      const bTime = new Date(groupedByStock[b][0].fetchedAt).getTime();
      return bTime - aTime;
    });

    for (const stockId of sortedStockIds) {
      const tasks = groupedByStock[stockId].map(entry => entry.status);
      const firstTask = tasks[tasks.length - 1]; // latest pushed to front, so last in array = first task

      let taskFlow = null;

      if (firstTask === "Fetching") {
        taskFlow = STOCK_STORING_FLOW;
      } else if (firstTask === "Fetching Delivery") {
        taskFlow = STOCK_DELIVERING_FLOW;
      }

      if (!taskFlow) continue;

      // Check if this stock flow is incomplete
      const isCompleted = tasks.includes("Completed");
      if (!isCompleted || tasks.length < taskFlow.length) {
        const latestTaskEntry = groupedByStock[stockId][0]; // latest for this stockId
        const now = new Date();
        const fetchedAt = new Date(latestTaskEntry.fetchedAt);
        const secondsAgo = Math.floor((now - fetchedAt) / 1000);

        return res.status(200).json({
          message: 'Latest status fetched successfully',
          deviceId: latestTaskEntry.deviceId,
          stockId: latestTaskEntry.stockId,
          status: latestTaskEntry.status,
          fetchedAt: latestTaskEntry.fetchedAt,
          secondsAgo: secondsAgo
        });
      }
    }

    // If all stocks are complete
    return res.status(404).json({ message: 'No ongoing stock process found.' });

  } catch (error) {
    console.error('Error fetching latest RobotStatus:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
