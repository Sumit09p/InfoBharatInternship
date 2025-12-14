const { Schema, model, Types } = require('mongoose');

const orderSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    listingId: { type: Types.ObjectId, ref: 'Listing', required: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, default: 'pending' },
    paymentStatus: { type: String, default: 'unpaid' },
  },
  { timestamps: true }
);

module.exports = model('Order', orderSchema);

