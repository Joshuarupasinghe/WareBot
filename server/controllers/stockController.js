const Stock = require("../models/stock");
const Counter = require("../models/counter");

// Add stock and increment stock ID
const addStock = async (req, res) => {
  try {
    let counter = await Counter.findOne({ name: "stockId" });

    if (!counter) {
      counter = await Counter.create({ name: "stockId", value: 1 });
    }

    const newStockId = counter.value;

    const newStock = new Stock({
      ...req.body,
      StockId: newStockId,
    });

    await newStock.save();

    await Counter.findOneAndUpdate({ name: "stockId" }, { $inc: { value: 1 } });

    res.status(201).json(newStock);
  } catch (error) {
    console.error("Error saving stock:", error);
    res.status(500).json({ message: error.message });
  }
};

const getStock = async (req, res) => {
  try {
    const stocks = await Stock.find({});
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stocks." });
  }
};

// Get current stock ID
const getStockIdCounter = async (req, res) => {
  try {
    let counter = await Counter.findOne({ name: "stockId" });

    if (!counter) {
      counter = await Counter.create({ name: "stockId", value: 1 });
    }

    res.status(200).json({ StockId: counter.value });
  } catch (error) {
    console.error("Error fetching counter:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all stocks
const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({})
      .select("StockId Name Quantity ExpiryDate RouteNumber BatchNumber")
      .sort({ createdAt: -1 });

    res.status(200).json(stocks);
  } catch (error) {
    console.error("Error fetching stocks:", error);
    res.status(500).json({ error: "Failed to fetch stocks." });
  }
};

// Get expiring stocks
const getExpiringStocks = async (req, res) => {
  try {
    const { range } = req.query;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let start, end;

    if (range === "days") {
      start = new Date(today);
      start.setDate(today.getDate() + 1);
      end = new Date(start);
      end.setHours(23, 59, 59, 999);
    } else if (range === "weeks") {
      start = new Date(today);
      start.setDate(today.getDate() + 1);
      end = new Date(today);
      end.setDate(today.getDate() + 7);
      end.setHours(23, 59, 59, 999);
    } else if (range === "months") {
      start = new Date(today);
      start.setDate(today.getDate() + 30);
      start.setHours(0, 0, 0, 0);
      end = new Date(today);
      end.setDate(today.getDate() + 60);
      end.setHours(23, 59, 59, 999);
    } else {
      return res.status(400).json({ error: "Invalid range parameter" });
    }

    const expiringStocks = await Stock.find({
      ExpiryDate: { $gte: start, $lte: end },
    }).select("StockId Name RouteNumber BatchNumber Quantity ExpiryDate");

    res.status(200).json(expiringStocks);
  } catch (error) {
    console.error("Error fetching expiring stocks:", error);
    res.status(500).json({ error: "Failed to fetch expiring stocks." });
  }
};

module.exports = {
  addStock,
  getStock,
  getStockIdCounter,
  getAllStocks,
  getExpiringStocks,
};
