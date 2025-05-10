const mongoose = require('mongoose');

const RobotStatusSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true },
    stockId: { type: String, required: true },
    status: { type: String, required: true },
    fetchedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('RobotStatus', RobotStatusSchema);
