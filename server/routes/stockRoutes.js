const express = require("express");
const { addStock,getStockIdCounter,getExpiringStocks, getStockById, getReorderSuggestions } = require("../controllers/stockController");
const router = express.Router();

router.post('/add', addStock);
router.get('/get-counter', getStockIdCounter);

// Search stocks by name
// router.get('/search', searchStocks);
router.get('/expiring', getExpiringStocks);
// Get stock details by StockId
router.get("/:id", getStockById);
router.get("/reorder-suggestions", getReorderSuggestions);


module.exports = router;