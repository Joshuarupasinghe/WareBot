const express = require('express');
const { addStock, getStockIdCounter } = require('../controllers/stockController');
const router = express.Router();

// Add stock endpoint
router.post('/add', addStock);

// Get the current StockId counter
router.get('/get-counter', getStockIdCounter);

module.exports = router;
