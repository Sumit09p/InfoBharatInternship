// backend/seedAdmin.js
require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function connectDB() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGO_URI); // ⬅ FIXED (no old options)
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  }
}

async function createAdmin() {
  await connectDB();

  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@test.com";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    // Check if admin already exists
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log("⚠ Admin already exists →", existing.email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const admin = await User.create({
      name: "Super Admin",
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("🎉 Admin created successfully!");
    console.log("Email:", admin.email);
    console.log("Password:", ADMIN_PASSWORD);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

createAdmin();
