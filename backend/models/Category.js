const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    iconUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = model('Category', categorySchema);

