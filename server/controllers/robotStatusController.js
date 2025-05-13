// ../controllers/robotStatusController.js

const RobotStatus = require('../models/RobotStatus');
const Stock = require('../models/stock');
const moment = require('moment-timezone');

const STOCK_STORING_FLOW = ["Fetching", "Moving to Shelf", "Placing", "Completed"];
const STOCK_DELIVERING_FLOW = ["Fetching Delivery", "Picking", "Moving to D-Zone", "Completed"];

exports.getLatestStatusForRobot001 = async (req, res) => {
    const deviceId = 'robot001';

    try {
        const statuses = await RobotStatus.find({ deviceId }).sort({ fetchedAt: 1 }); // Sort by oldest first

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

        for (const stockId in groupedByStock) {
            const tasks = groupedByStock[stockId].map(entry => entry.status);
            const isCompleted = tasks.includes("Completed");

            if (!isCompleted) {
                const oldestIncompleteStatus = groupedByStock[stockId][0]; // The first one due to sorting
                return res.status(200).json({
                    message: 'Latest status fetched successfully',
                    deviceId: oldestIncompleteStatus.deviceId,
                    stockId: oldestIncompleteStatus.stockId,
                });
            }
        }

        return res.status(404).json({ message: 'No ongoing stock process found.' });

    } catch (error) {
        console.error('Error fetching latest RobotStatus:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getLatestDetailForStockId = async (req, res) => {
    const { stockId } = req.params;
    const deviceId = 'robot001';

    try {
        const latestStatus = await RobotStatus.findOne({ deviceId, stockId }).sort({ fetchedAt: -1 });

        if (!latestStatus) {
            return res.status(404).json({ message: `No status found for deviceId ${deviceId} and stockId ${stockId}` });
        }

        const now = moment().tz('Asia/Colombo');
        const fetchedAtSL = moment(latestStatus.fetchedAt).tz('Asia/Colombo').format('YYYY-MM-DD HH:mm:ss');
        const fetchedAt = new Date(latestStatus.fetchedAt);
        const secondsAgo = Math.floor((now - moment(fetchedAt)) / 1000);

        return res.status(200).json({
            message: 'Latest status fetched successfully',
            deviceId: latestStatus.deviceId,
            stockId: latestStatus.stockId,
            status: latestStatus.status,
            fetchedAt: fetchedAtSL,
            secondsAgo: secondsAgo
        });

    } catch (error) {
        console.error(`Error fetching latest status for stockId ${stockId}:`, error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.getPendingStocks = async (req, res) => {
    const deviceId = 'robot001';

    try {
        const allStatuses = await RobotStatus.find({ deviceId }).sort({ fetchedAt: 1 });

        const groupedByStock = {};
        for (const status of allStatuses) {
            if (!groupedByStock[status.stockId]) {
                groupedByStock[status.stockId] = [];
            }
            groupedByStock[status.stockId].push(status);
        }

        const pendingStocks = [];
        for (const stockId in groupedByStock) {
            const statusesForStock = groupedByStock[stockId];
            const hasFetchingOrDelivery = statusesForStock.some(status => status.status === "Fetching" || status.status === "Fetching Delivery");
            const hasMovedBeyondInitial = statusesForStock.some(status => status.status !== "Fetching" && status.status !== "Fetching Delivery" && status.status !== "Completed");
            const hasCompleted = statusesForStock.some(status => status.status === "Completed");

            if (hasFetchingOrDelivery && !hasMovedBeyondInitial && !hasCompleted) {
                const earliestStatus = statusesForStock.find(status => status.status === "Fetching" || status.status === "Fetching Delivery");
                if (earliestStatus) {
                    const stockInfo = await Stock.findOne({ StockId: stockId });
                    pendingStocks.push({
                        stockId: stockId,
                        status: earliestStatus.status,
                        fetchedAt: earliestStatus.fetchedAt,
                        time: calculateTimeDifference(earliestStatus.fetchedAt),
                        ...(stockInfo && stockInfo.toObject()),
                    });
                }
            }
        }

        res.status(200).json(pendingStocks);

    } catch (error) {
        console.error('Error fetching pending stocks:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

function calculateTimeDifference(pastDate) {
    const now = moment().tz('Asia/Colombo');
    const past = moment(pastDate);
    const duration = moment.duration(now.diff(past));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    let timeString = '';
    if (days > 0) {
        timeString += `<span class="font-semibold">${days} Day${days > 1 ? 's' : ''}</span> `;
    }
    if (hours > 0) {
        timeString += `<span class="font-semibold">${hours} Hr${hours > 1 ? 's' : ''}</span> `;
    }
    if (minutes >= 0 && days === 0) {
        timeString += `<span class="font-semibold">${minutes} Min${minutes !== 1 ? 's' : ''}</span>`;
    }

    return timeString || '<span class="font-semibold">Just now</span>';
}