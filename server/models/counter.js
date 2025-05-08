const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "stockId"
  value: { type: Number, default: 0 }, // The current counter value
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
