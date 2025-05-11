const mongoose = require('mongoose');

const incomingAverageSchema = new mongoose.Schema({
  productName: { 
    type: String, 
    required: true 
  },
  incomingAverage: { 
    type: Number, 
    required: true 
  },
  temperature: { 
    type: String 
  },
  humidity: { 
    type: String 
  },
  lightning: { 
    type: String 
  },
  dateTime: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

const IncomingAverage = mongoose.model('IncomingAverage', incomingAverageSchema);

module.exports = IncomingAverage;