const mongoose = require('mongoose');

const ShelfSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, unique: true },
    ip: { type: String, required: true },
    lastHeartbeat: { type: Date, default: Date.now },
    readings: [
      {
        height: { type: Number, required: true },
        length: { type: Number, required: true },
        space: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shelf', ShelfSchema);
