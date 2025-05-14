const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true, unique: true },
  stockId: { type: Number, ref: 'Stock', required: true },
  orderDate: { type: Date, required: true },
  shippingDate: { type: Date },
  quantity: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });

// Calculate lead time in days
orderSchema.virtual('leadTime').get(function() {
  if (!this.shippingDate || !this.orderDate) return null;
  
  const diffTime = Math.abs(this.shippingDate - this.orderDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Ensure virtuals are included when converting to JSON
orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
