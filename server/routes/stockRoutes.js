const express = require("express");
const { addStock,getStockIdCounter,getExpiringStocks, getStock } = require("../controllers/stockController");
const router = express.Router();

// Add stock endpoint
router.post("/add", addStock);

// Get all stocks endpoint
router.get("/get", getStock);

// Get the current StockId counter
router.get("/get-counter", getStockIdCounter);

// Get expiring stocks
router.get("/expiring", getExpiringStocks);

module.exports = router;
