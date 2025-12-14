// backend/routes/authRoutes.js
const router = require("express").Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUser,
} = require("../controllers/authController");

const User = require("../models/User");

const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validators/authSchemas");

const { verifyToken, requireRole } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post(
  "/me/avatar",
  verifyToken,
  upload.single("avatar"),
  async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarUrl: `/uploads/${req.file.filename}` },
      { new: true }
    ).select("-password");

    res.json({ user });
  }
);


// -------------------------------
// PUBLIC ROUTES
// -------------------------------
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

// -------------------------------
// AUTHENTICATED USER ROUTES
// -------------------------------
router.get("/me", verifyToken, getUserProfile);
router.put("/me", verifyToken, updateUser);

// -------------------------------
// ADMIN-ONLY ROUTES
// -------------------------------

// 1) Get all users
router.get(
  "/",
  verifyToken,
  requireRole("admin"),
  async (req, res, next) => {
    try {
      const users = await User.find().select("-password");
      res.json({ users });
    } catch (err) {
      next(err);
    }
  }
);

// 2) Update any user (role, name, etc.)
router.put(
  "/:id",
  verifyToken,
  requireRole("admin"),
  async (req, res, next) => {
    try {
      const updated = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).select("-password");

      if (!updated) return res.status(404).json({ error: "User not found" });

      res.json({ user: updated });
    } catch (err) {
      next(err);
    }
  }
);

// 3) Delete user
router.delete(
  "/:id",
  verifyToken,
  requireRole("admin"),
  async (req, res, next) => {
    try {
      const deleted = await User.findByIdAndDelete(req.params.id);

      if (!deleted) return res.status(404).json({ error: "User not found" });

      res.json({ message: "User deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// -------------------------------
// PUBLIC PROFILE BY ID
// -------------------------------
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
