// backend/routes/categoryRoutes.js
const router = require('express').Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getListingsByCategory,
} = require('../controllers/categoryController');

const { verifyToken, requireRole } = require('../middleware/authMiddleware');

// PUBLIC ROUTES
router.get('/', getCategories);                    // Get all categories
router.get('/:id', getCategoryById);               // Get single category
router.get('/:id/listings', getListingsByCategory); // Get listings in category

// PROTECTED ROUTES (only admin)
router.post('/', verifyToken, requireRole('admin'), createCategory);
router.put('/:id', verifyToken, requireRole('admin'), updateCategory);
router.delete('/:id', verifyToken, requireRole('admin'), deleteCategory);

module.exports = router;
