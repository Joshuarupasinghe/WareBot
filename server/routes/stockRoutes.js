const express = require("express");
const { addStock,getStockIdCounter,getExpiringStocks, getStockById } = require("../controllers/stockController");
const router = express.Router();

// Add stock endpoint
router.post("/add", addStock);

// Get the current StockId counter
router.get("/get-counter", getStockIdCounter);

// Get expiring stocks
router.get("/expiring", getExpiringStocks);

// Get stock details by StockId
router.get("/:id", getStockById);


module.exports = router;
