const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  customerPhone: { type: String }, // Optional phone for bill
  customerAddress: { type: String }, // Optional address for bill
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  paymentMethod: { type: String, enum: ['cash', 'card', 'upi', 'unpaid'], default: 'unpaid' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
