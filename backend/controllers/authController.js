const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtSecret = process.env.JWT_SECRET || "change_me";

// 🔐 Generate JWT with role
const generateToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: "7d" }
  );

// ===============================
// POST /api/users/register
// ===============================
const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, avatarUrl, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      avatarUrl,
      role: role || "user", // ✅ IMPORTANT
    });

    return res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// ===============================
// POST /api/users/login
// ===============================
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// ===============================
// GET /api/users/me
// ===============================
const getUserProfile = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user });
  } catch (err) {
    return next(err);
  }
};

// ===============================
// PUT /api/users/me
// ===============================
const updateUser = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { name, phone, avatarUrl, password } = req.body;
    const update = {};

    if (name !== undefined) update.name = name;
    if (phone !== undefined) update.phone = phone;
    if (avatarUrl !== undefined) update.avatarUrl = avatarUrl;
    if (password) update.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.user.id, update, {
      new: true,
      runValidators: true,
      select: "-password",
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUser,
};
