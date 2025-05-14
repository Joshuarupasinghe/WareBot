const Stock = require("../models/stock");
const Counter = require("../models/counter"); // Import the Counter model

// Add stock and increment stock ID after saving
const addStock = async (req, res) => {
  try {
    let counter = await Counter.findOne({ name: "stockId" });

    if (!counter) {
      counter = await Counter.create({ name: "stockId", value: 1 });
    }

    const newStockId = counter.value;

    const newStock = new Stock({
      ...req.body,
      StockId: newStockId, // Set the StockId from the counter
    });

    await newStock.save();

    // Increment the counter value after the stock has been saved
    await Counter.findOneAndUpdate({ name: "stockId" }, { $inc: { value: 1 } });

    res.status(201).json(newStock);
  } catch (error) {
    console.error("Error saving stock:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fetch the current stock ID (without incrementing)
const getStockIdCounter = async (req, res) => {
  try {
    let counter = await Counter.findOne({ name: "stockId" });

    if (!counter) {
      counter = await Counter.create({ name: "stockId", value: 1 });
    }

    res.status(200).json({ StockId: counter.value }); // Return the next StockId
  } catch (error) {
    console.error("Error fetching counter:", error);
    res.status(500).json({ message: error.message });
  }
};

// Search stocks by name (case-insensitive)
const searchStocks = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: 'Name query is required.' });

    const regex = new RegExp(name, 'i');
    const stocks = await Stock.find({ Name: { $regex: regex } }).limit(10);
    res.status(200).json(stocks);
  } catch (error) {
    console.error("Error searching stocks:", error);
    res.status(500).json({ message: error.message });
  }
};

const getExpiringStocks = async (req, res) => {
  try {
    const { range } = req.query;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let start, end;

    if (range === "days") {
      // Tomorrow only
      start = new Date(today);
      start.setDate(today.getDate() + 1);

      end = new Date(start);
      end.setHours(23, 59, 59, 999);
    } else if (range === "weeks") {
      // Next 7 days
      start = new Date(today);
      start.setDate(today.getDate() + 1); // Tomorrow

      end = new Date(today);
      end.setDate(today.getDate() + 7);
      end.setHours(23, 59, 59, 999);
    } else if (range === "months") {
      // Expiring from day 30 to day 60
      start = new Date(today);
      start.setDate(today.getDate() + 30);
      start.setHours(0, 0, 0, 0);

      end = new Date(today);
      end.setDate(today.getDate() + 60);
      end.setHours(23, 59, 59, 999);
    } else {
      return res.status(400).json({ error: "Invalid range parameter" });
    }

    console.log(
      "Querying ExpiryDate between",
      start.toISOString(),
      "and",
      end.toISOString()
    );

    const expiringStocks = await Stock.find({
      ExpiryDate: { $gte: start, $lte: end },
    }).select("StockId Name RouteNumber BatchNumber Quantity ExpiryDate");

    res.status(200).json(expiringStocks);
  } catch (error) {
    console.error("Error fetching expiring stocks:", error);
    res.status(500).json({ error: "Failed to fetch expiring stocks." });
  }
};

module.exports = { addStock, getStockIdCounter, getExpiringStocks, searchStocks };
