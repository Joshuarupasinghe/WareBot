const express = require("express");
<<<<<<< HEAD
const { addStock, getStockIdCounter, getExpiringStocks, searchStocks} = require("../controllers/stockController");
=======
const { addStock,getStockIdCounter,getExpiringStocks, getStockById, getReorderSuggestions } = require("../controllers/stockController");
>>>>>>> 2529cdfe49703cbefcdabad24c284598f54f522c
const router = express.Router();

router.post('/add', addStock);
router.get('/get-counter', getStockIdCounter);

// Search stocks by name
router.get('/search', searchStocks);
router.get('/expiring', getExpiringStocks);
// Get stock details by StockId
router.get("/:id", getStockById);
router.get("/reorder-suggestions", getReorderSuggestions);


module.exports = router;
