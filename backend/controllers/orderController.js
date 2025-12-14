const Order = require("../models/Order");
const Listing = require("../models/Listing");

// POST /api/orders
const createOrder = async (req, res, next) => {
  const { listingId, quantity } = req.body;

  const listing = await Listing.findById(listingId);
  if (!listing) return res.status(404).json({ error: "Listing not found" });

  const order = await Order.create({
    userId: req.user.id,
    listingId,
    quantity,
    amount: listing.price * quantity,
    status: "pending",
    paymentStatus: "pending",
  });

  res.status(201).json({ order });
};

// ✅ TASK API
// GET /api/orders/:userId
const getUserOrders = async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const orders = await Order.find({ userId: req.user.id }).lean();
  res.json({ orders });
};

// ✅ REAL-WORLD HELPER
// GET /api/orders/my
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id })
    .populate("listingId", "title price")
    .sort({ createdAt: -1 })
    .lean();

  res.json({ orders });
};

// GET /api/orders/order/:id
const getOrderById = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const order = await Order.findById(req.params.id)
      .populate("listingId", "title price")
      .lean();

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // 🔐 Only owner can view
    if (order.userId.toString() !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json({ order });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  createOrder,
  getUserOrders,
  getMyOrders,
  getOrderById,
};
