const Listing = require("../models/Listing");

const sortMap = {
  latest: { createdAt: -1 },
  price_low: { price: 1 },
  price_high: { price: -1 },
  popular: { rating: -1 },
};

// ===============================
// GET /api/listings
// ===============================
const getListings = async (req, res, next) => {
  try {
    const { search, category, location, min, max, sort } = req.query;

    const filters = {};

    // 🔍 SEARCH
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    // 📂 CATEGORY
    if (category) filters.category = category;

    // 📍 LOCATION
    if (location) filters.location = { $regex: location, $options: "i" };

    // 💰 PRICE
    if (min || max) {
      filters.price = {};
      if (min) filters.price.$gte = Number(min);
      if (max) filters.price.$lte = Number(max);
    }

    const sortOption = sortMap[sort] || sortMap.latest;

    const listings = await Listing.find(filters).sort(sortOption).lean();
    res.json({ listings });
  } catch (err) {
    next(err);
  }
};

// ===============================
// GET /api/listings/:id
// ===============================
const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).lean();
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    res.json({ listing });
  } catch (err) {
    next(err);
  }
};

// ===============================
// POST /api/listings
// ===============================
const createListing = async (req, res, next) => {
  try {
    const sellerId = req.user.id;

    const { title, description, category, price, location, images } = req.body;

    if (!title || !category || price == null) {
      return res
        .status(400)
        .json({ error: "Title, category and price required" });
    }

    const listing = await Listing.create({
      title,
      description,
      category,
      price,
      location,
      images,
      sellerId,
    });

    res.status(201).json({ listing });
  } catch (err) {
    next(err);
  }
};

// ===============================
// PUT /api/listings/:id
// ===============================
const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    // 🔥 CORRECT OWNERSHIP CHECK
    if (!listing.sellerId.equals(req.user.id)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    Object.assign(listing, req.body);
    await listing.save();

    res.json({ listing });
  } catch (err) {
    next(err);
  }
};

// ===============================
// DELETE /api/listings/:id
// ===============================
const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    // 🔥 CORRECT OWNERSHIP CHECK
    if (!listing.sellerId.equals(req.user.id)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await listing.deleteOne();
    res.json({ message: "Listing deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
};
