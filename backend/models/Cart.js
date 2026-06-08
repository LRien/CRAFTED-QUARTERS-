const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guestId: { type: String },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      image: String,
      price: Number,
      size: String,
      color: String,
      quantity: Number,
    }
  ],
  totalPrice: Number,
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
