const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    password: { type: String, required: true },
    avatarUrl: { type: String, trim: true },

    // ✅ ADD THIS
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
