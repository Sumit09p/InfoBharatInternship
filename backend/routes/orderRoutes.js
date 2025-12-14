const router = require("express").Router();
const {
  createOrder,
  getUserOrders,
  getMyOrders,
  getOrderById,
} = require("../controllers/orderController");
const { verifyToken } = require("../middleware/authMiddleware");

// 🔐 REAL-WORLD HELPER (frontend uses this)
router.get("/my", verifyToken, getMyOrders);

// 🔐 TASK REQUIRED API
router.get("/:userId", verifyToken, getUserOrders);

// 🔐 SINGLE ORDER
router.get("/order/:id", verifyToken, getOrderById);

// 🔐 CREATE ORDER
router.post("/", verifyToken, createOrder);

// ✅ ALWAYS export router
module.exports = router;
