const { Schema, model, Types } = require('mongoose');

const listingSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    sellerId: { type: Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
  },
  { timestamps: true }
);

module.exports = model('Listing', listingSchema);

