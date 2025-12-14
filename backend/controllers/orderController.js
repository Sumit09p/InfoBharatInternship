const Order = require('../models/Order');
const Listing = require('../models/Listing');

// POST /api/orders
const createOrder = async (req, res, next) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { listingId, quantity } = req.body;

    if (!listingId || !quantity) {
      return res.status(400).json({ error: "listingId and quantity are required" });
    }

    // Get the listing price
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    // Calculate amount
    const amount = listing.price * quantity;

    const order = await Order.create({
      userId,
      listingId,
      quantity,
      amount,
      status: "pending",
      paymentStatus: "pending",
    });

    return res.status(201).json({ order });

  } catch (err) {
    return next(err);
  }
};

// GET /api/orders/:userId
const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId || userId !== req.params.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const orders = await Order.find({ userId }).lean();
    return res.json({ orders });
  } catch (err) {
    return next(err);
  }
};

// GET /api/orders/order/:id
const getOrderById = async (req, res, next) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const order = await Order.findById(req.params.id).lean();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    return res.json({ order });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
};
