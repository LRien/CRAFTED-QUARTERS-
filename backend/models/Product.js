const mongoose = require("mongoose");

// Review subdocument schema
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
}, {
  timestamps: true
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  countInStock: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  collection: { type: String },
  material: { type: String },

  images: [
    {
      url: { type: String, required: true },
      altText: { type: String }
    }
  ],

  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  tags: [{ type: String }],
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  weight: { type: Number },
  sku: { type: String, required: true, unique: true },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // ✅ Ratings
  reviews: [reviewSchema],
  numReviews: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 }

}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
