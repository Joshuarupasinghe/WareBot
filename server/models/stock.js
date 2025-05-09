
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  StockId: { type: Number, required: true, unique: true }, // Custom StockId
  Name: String,
  Price: String,
  Category: String,
  ExpiryDate: String,
  ManufactureDate: String,
  BatchNumber: String,
  Quantity: String,
  RouteNumber: String,
  Temperature: String,
  Weight: String,
  Lighting: String,
  Humidity: String
}, { timestamps: true });

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
