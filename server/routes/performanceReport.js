const express = require('express');
const router = express.Router();
const Stock = require('../models/stock'); // Import the Stock model
const IncomingAverage = require('../models/incomingAverage'); // Import the IncomingAverage model
const moment = require('moment'); // Use moment.js for date manipulation

// API endpoint to fetch performance report data
router.get('/performance-report', async (req, res) => {
    try {
        // Calculate the date 30 days from today
        const thirtyDaysFromNow = moment().add(30, 'days').toDate();

        // Query the Stock collection for records with ExpiryDate within the next 30 days
        const expiringStocks = await Stock.find({
            ExpiryDate: { $gte: new Date(), $lte: thirtyDaysFromNow }
        }).select('Name ExpiryDate'); // Select Name and ExpiryDate fields

        // Query the IncomingAverage collection to get the total sum of incomingAverage
        const incomingAverages = await IncomingAverage.find().select('productName incomingAverage');
        const totalIncomingAverage = incomingAverages.reduce((sum, avg) => sum + avg.incomingAverage, 0);

        // Format the response
        const response = expiringStocks.map(stock => {
            // Find the corresponding incomingAverage for the product
            const incomingAverageData = incomingAverages.find(avg => avg.productName === stock.Name);

            // Calculate the percentage of the total incomingAverage
            const stockInflowRate = totalIncomingAverage
                ? ((incomingAverageData?.incomingAverage || 0) / totalIncomingAverage * 100).toFixed(2) + '%'
                : 'N/A';

            return {
                StockExpiryWarning: stock.Name, // Use Name as the warning
                ExpiryDate: stock.ExpiryDate,
                StockInflowRate: stockInflowRate, // Add Stock Inflow Rate
                StockOutflowRate: Math.random().toFixed(2) * 100 + '%' // Mock outflow rate
            };
        });

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching performance report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;