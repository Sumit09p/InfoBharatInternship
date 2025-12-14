const { Schema, model, Types } = require("mongoose");

const listingSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    sellerId: { type: Types.ObjectId, ref: "User", required: true },

    // ⭐ RATING SYSTEM
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    ratings: [
      {
        userId: { type: Types.ObjectId, ref: "User" },
        stars: { type: Number, min: 1, max: 5 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Listing", listingSchema);
