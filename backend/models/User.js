const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    password: { type: String, required: true }, // store hashed password
    avatarUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);

