const Listing = require('../models/Listing');

const buildFilters = (queryParams) => {
  const filters = {};

  // Price filter: ?price=min-max
  if (queryParams.price) {
    const [min, max] = queryParams.price.split('-').map((v) => Number(v));
    filters.price = {};
    if (!Number.isNaN(min)) filters.price.$gte = min;
    if (!Number.isNaN(max)) filters.price.$lte = max;
    if (Object.keys(filters.price).length === 0) delete filters.price;
  }

  // Location filter: ?location=city
  if (queryParams.location) {
    filters.location = queryParams.location;
  }

  // Category filter (optional): ?category=categoryId
  if (queryParams.category) {
    filters.category = queryParams.category;
  }

  return filters;
};

const sortMap = {
  latest: { createdAt: -1 },
  price_low: { price: 1 },
  price_high: { price: -1 },
  popular: { rating: -1 },
};

// GET /api/listings
const getListings = async (req, res, next) => {
  try {
    const filters = buildFilters(req.query);
    const sort = sortMap[req.query.sort] || sortMap.latest;

    const listings = await Listing.find(filters).sort(sort).lean();
    return res.json({ listings });
  } catch (err) {
    return next(err);
  }
};

// GET /api/listings/:id
const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).lean();
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    return res.json({ listing });
  } catch (err) {
    return next(err);
  }
};

// POST /api/listings (protected)
const createListing = async (req, res, next) => {
  try {
    const sellerId = req.user && req.user.id;
    if (!sellerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { title, description, category, price, location, images, rating } = req.body;
    if (!title || !category || price === undefined) {
      return res.status(400).json({ error: 'Title, category, and price are required' });
    }

    const listing = await Listing.create({
      title,
      description,
      category,
      price,
      location,
      images,
      sellerId,
      rating,
    });

    return res.status(201).json({ listing });
  } catch (err) {
    return next(err);
  }
};

// PUT /api/listings/:id (protected, only seller)
const updateListing = async (req, res, next) => {
  try {
    const sellerId = req.user && req.user.id;
    if (!sellerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (listing.sellerId.toString() !== sellerId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const fields = ['title', 'description', 'category', 'price', 'location', 'images', 'rating'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        listing[field] = req.body[field];
      }
    });

    await listing.save();
    return res.json({ listing });
  } catch (err) {
    return next(err);
  }
};

// DELETE /api/listings/:id (protected, only seller)
const deleteListing = async (req, res, next) => {
  try {
    const sellerId = req.user && req.user.id;
    if (!sellerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (listing.sellerId.toString() !== sellerId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await listing.deleteOne();
    return res.json({ message: 'Listing deleted' });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
};

