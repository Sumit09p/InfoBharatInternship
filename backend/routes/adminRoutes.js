const router = require("express").Router();
const User = require("../models/User");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// GET all users (admin only)
router.get("/users", verifyToken, requireRole("admin"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ users });
});

// DELETE a user by ID
router.delete("/users/:id", verifyToken, requireRole("admin"), async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "User not found" });
  res.json({ message: "User deleted" });
});

// UPDATE user role
router.put("/users/:id/role", verifyToken, requireRole("admin"), async (req, res) => {
  const { role } = req.body;
  if (!["buyer", "seller", "admin"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true, select: "-password" }
  );

  if (!updated) return res.status(404).json({ error: "User not found" });

  res.json({ user: updated });
});

module.exports = router;
