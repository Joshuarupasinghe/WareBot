const express = require("express");
const router = express.Router();
const {
  addStock,
  getStock,
  getStockIdCounter,
  getAllStocks,
  getExpiringStocks
} = require("../controllers/stockController");



router.post('/', addStock);
router.get('/', getStock);
router.get('/counter', getStockIdCounter);
router.get('/all', getAllStocks);
router.get('/expiring', getExpiringStocks);

module.exports = router;
