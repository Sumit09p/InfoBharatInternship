const Category = require('../models/Category');

// CREATE CATEGORY
const createCategory = async (req, res, next) => {
  try {
    const { name, iconUrl } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await Category.create({ name, iconUrl });

    return res.status(201).json({ category });
  } catch (err) {
    return next(err);
  }
};

// GET ALL CATEGORIES
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().lean();
    return res.json({ categories });
  } catch (err) {
    return next(err);
  }
};

// GET SINGLE CATEGORY
const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.json({ category });
  } catch (err) {
    next(err);
  }
};

// UPDATE CATEGORY
const updateCategory = async (req, res, next) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.json({ category: updated });
  } catch (err) {
    next(err);
  }
};

// DELETE CATEGORY
const deleteCategory = async (req, res, next) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.json({ message: "Category deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// GET LISTINGS IN CATEGORY (placeholder)
const getListingsByCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).lean();
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const listings = []; // Later attach real listings

    return res.json({ category, listings });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getListingsByCategory
};
