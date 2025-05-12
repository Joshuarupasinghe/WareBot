const express = require("express");
const { addStock,getStockIdCounter,getExpiringStocks, getStockById } = require("../controllers/stockController");
const router = express.Router();

router.post('/add', addStock);
router.get('/get-counter', getStockIdCounter);
router.get('/expiring', getExpiringStocks);
// Get stock details by StockId
router.get("/:id", getStockById);


module.exports = router;
