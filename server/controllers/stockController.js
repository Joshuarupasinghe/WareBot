const Stock = require('../models/stock');
const Counter = require('../models/counter'); // Import the Counter model

// Add stock and increment stock ID after saving
const addStock = async (req, res) => {
  try {
    let counter = await Counter.findOne({ name: 'stockId' });

    if (!counter) {
      counter = await Counter.create({ name: 'stockId', value: 1 });
    }

    const newStockId = counter.value;

    const newStock = new Stock({
      ...req.body,
      StockId: newStockId, // Set the StockId from the counter
    });

    await newStock.save();

    // Increment the counter value after the stock has been saved
    await Counter.findOneAndUpdate(
      { name: 'stockId' },
      { $inc: { value: 1 } }
    );

    res.status(201).json(newStock);
  } catch (error) {
    console.error("Error saving stock:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fetch the current stock ID (without incrementing)
const getStockIdCounter = async (req, res) => {
  try {
    let counter = await Counter.findOne({ name: 'stockId' });

    if (!counter) {
      counter = await Counter.create({ name: 'stockId', value: 1 });
    }

    res.status(200).json({ StockId: counter.value });  // Return the next StockId
  } catch (error) {
    console.error("Error fetching counter:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addStock, getStockIdCounter };
