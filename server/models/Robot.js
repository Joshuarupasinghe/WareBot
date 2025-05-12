const mongoose = require('mongoose');

const RobotSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, unique: true },
    ip: { type: String, required: true },
    lastHeartbeat: { type: Date, default: Date.now },
    temperatureReadings: [
      {
        value: { type: Number },
        timestamp: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Robot', RobotSchema);
