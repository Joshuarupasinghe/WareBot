// ../controllers/robotStatusController.js

const RobotStatus = require('../models/RobotStatus');
const Stock = require('../models/stock');
const moment = require('moment-timezone');

const STOCK_STORING_FLOW = ["Fetching", "Moving to Shelf", "Placing", "Completed"];
const STOCK_DELIVERING_FLOW = ["Fetching Delivery", "Picking", "Moving to D-Zone", "Completed"];

exports.getLatestStatusForRobot001 = async (req, res) => {
    const deviceId = 'robot001';

    try {
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

        const sortedStockIds = Object.keys(groupedByStock).sort((a, b) => {
            const aTime = new Date(groupedByStock[a][0].fetchedAt).getTime();
            const bTime = new Date(groupedByStock[b][0].fetchedAt).getTime();
            return bTime - aTime;
        });

        for (const stockId of sortedStockIds) {
            const tasks = groupedByStock[stockId].map(entry => entry.status);
            const firstTask = tasks[tasks.length - 1];

            let taskFlow = null;

            if (firstTask === "Fetching") {
                taskFlow = STOCK_STORING_FLOW;
            } else if (firstTask === "Fetching Delivery") {
                taskFlow = STOCK_DELIVERING_FLOW;
            }

            if (!taskFlow) continue;

            const isCompleted = tasks.includes("Completed");
            if (!isCompleted || tasks.length < taskFlow.length) {
                const latestTaskEntry = groupedByStock[stockId][0];
                const now = moment().tz('Asia/Colombo');
                const fetchedAtSL = moment(latestTaskEntry.fetchedAt).tz('Asia/Colombo').format('YYYY-MM-DD HH:mm:ss');
                const fetchedAt = new Date(latestTaskEntry.fetchedAt);
                const secondsAgo = Math.floor((now - moment(fetchedAt)) / 1000);

                return res.status(200).json({
                    message: 'Latest status fetched successfully',
                    deviceId: latestTaskEntry.deviceId,
                    stockId: latestTaskEntry.stockId,
                    status: latestTaskEntry.status,
                    fetchedAt: fetchedAtSL,
                    secondsAgo: secondsAgo
                });
            }
        }

        return res.status(404).json({ message: 'No ongoing stock process found.' });

    } catch (error) {
        console.error('Error fetching latest RobotStatus:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getPendingStocks = async (req, res) => {
    const deviceId = 'robot001';

    try {
        const allStatuses = await RobotStatus.find({ deviceId }).sort({ fetchedAt: 1 });

        const pendingStockIds = new Set();
        const completedStockIds = new Set();

        for (const status of allStatuses) {
            if (status.status === "Fetching" || status.status === "Fetching Delivery") {
                pendingStockIds.add(status.stockId);
            } else if (status.status === "Completed") {
                completedStockIds.add(status.stockId);
            }
        }

        // Filter out stockIds that have reached the 'Completed' status
        const trulyPendingStockIds = [...pendingStockIds].filter(stockId => !completedStockIds.has(stockId));

        const pendingStocks = [];
        for (const stockId of trulyPendingStockIds) {
            // Find the *earliest* "Fetching" or "Fetching Delivery" status for this stockId
            const initialStatus = await RobotStatus.findOne({
                deviceId,
                stockId,
                status: { $in: ["Fetching", "Fetching Delivery"] }
            }).sort({ fetchedAt: 1 });

            if (initialStatus) {
                const stockInfo = await Stock.findOne({ StockId: stockId });
                if (stockInfo) {
                    pendingStocks.push({
                        stockId: stockId,
                        status: initialStatus.status,
                        fetchedAt: initialStatus.fetchedAt,
                        time: calculateTimeDifference(initialStatus.fetchedAt),
                        ...stockInfo.toObject(),
                    });
                } else {
                    pendingStocks.push({
                        stockId: stockId,
                        status: initialStatus.status,
                        fetchedAt: initialStatus.fetchedAt,
                        time: calculateTimeDifference(initialStatus.fetchedAt),
                        productName: 'Unknown Product',
                        route: 'Unknown Route',
                        batchNo: 'N/A',
                        quantity: 'N/A',
                        location: 'N/A',
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