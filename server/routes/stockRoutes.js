const express = require("express");
const { addStock, getStockIdCounter, getExpiringStocks, searchStocks} = require("../controllers/stockController");
const router = express.Router();

// Add stock endpoint
router.post("/add", addStock);

// Get the current StockId counter
router.get("/get-counter", getStockIdCounter);

// Search stocks by name
router.get('/search', searchStocks);

// Get expiring stocks
router.get("/expiring", getExpiringStocks);

module.exports = router;
