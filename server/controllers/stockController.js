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

const getExpiringStocks = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentDayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const daysUntilNextMonday = (7 - currentDayOfWeek) % 7;
    const startOfNextWeek = new Date(today);
    startOfNextWeek.setDate(today.getDate() + daysUntilNextMonday);
    startOfNextWeek.setHours(0, 0, 0, 0);

    const endOfSecondWeek = new Date(startOfNextWeek);
    endOfSecondWeek.setDate(startOfNextWeek.getDate() + 13); // End of the week after next (14 days total)
    endOfSecondWeek.setHours(23, 59, 59, 999);

    const range = req.query.range;

    if (range === "days") {
      const threeDaysFromNow = new Date(today);
      threeDaysFromNow.setDate(today.getDate() + 3);
      threeDaysFromNow.setHours(23, 59, 59, 999);

      const stocks = await Stock.find({
        ExpiryDate: { $gte: today, $lte: threeDaysFromNow },
      }).select("StockId Name RouteNumber BatchNumber Quantity ExpiryDate");
      return res.status(200).json(stocks);
    } else if (range === "weeks") {
      const stocks = await Stock.find({
        ExpiryDate: { $gte: startOfNextWeek, $lte: endOfSecondWeek },
      }).select("StockId Name RouteNumber BatchNumber Quantity ExpiryDate");
      return res.status(200).json(stocks);
    } else if (range === "months") {
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      const startOfNextMonth = new Date(currentYear, currentMonth + 1, 1);
      startOfNextMonth.setHours(0, 0, 0, 0);

      const stocks = await Stock.find({
        ExpiryDate: { $gte: startOfNextMonth },
      }).select("StockId Name RouteNumber BatchNumber Quantity ExpiryDate");
      return res.status(200).json(stocks);
    } else {
      return res.status(400).json({ error: "Invalid range parameter" });
    }
  } catch (error) {
    console.error("Error fetching expiring stocks:", error);
    return res.status(500).json({ error: "Failed to fetch expiring stocks." });
  }
};

const getStockById = async (req, res) => {
  console.log("Received request for stock with ID:", req.params.id); // Log the request
  const stockId = req.params.id;
  try {
    const stock = await Stock.findOne({ StockId: stockId });
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addStock,
  getStockIdCounter,
  getExpiringStocks,
  getStockById,
};
