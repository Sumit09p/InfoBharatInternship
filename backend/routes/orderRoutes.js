const router = require('express').Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
} = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

// Specific route first to avoid conflict with :userId
router.get('/order/:id', verifyToken, getOrderById);
router.get('/:userId', verifyToken, getUserOrders);
router.post('/', verifyToken, createOrder);

module.exports = router;

