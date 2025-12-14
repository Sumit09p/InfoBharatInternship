const router = require("express").Router();
const Listing = require("../models/Listing");

const {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");

const { verifyToken, requireRole } = require("../middleware/authMiddleware");

/* ===========================
   SELLER: MY LISTINGS (MUST BE FIRST)
=========================== */
router.get(
  "/my",
  verifyToken,
  requireRole("seller", "admin"),
  async (req, res) => {
    try {
      const listings = await Listing.find({
        sellerId: req.user.id,
      }).sort({ createdAt: -1 });

      res.json({ listings });
    } catch (err) {
      res.status(500).json({ error: "Failed to load my listings" });
    }
  }
);

/* ===========================
   PUBLIC
=========================== */
router.get("/", getListings);

/* ===========================
   PROTECTED (SELLER / ADMIN)
=========================== */
router.post("/", verifyToken, requireRole("seller", "admin"), createListing);
router.put("/:id", verifyToken, requireRole("seller", "admin"), updateListing);
router.delete("/:id", verifyToken, requireRole("seller", "admin"), deleteListing);

/* ===========================
   SINGLE LISTING (LAST)
=========================== */
router.get("/:id", getListingById);

/* ===========================
   RATING
=========================== */
router.post("/:id/rate", verifyToken, async (req, res) => {
  try {
    const { stars } = req.body;
    if (stars < 1 || stars > 5)
      return res.status(400).json({ error: "Invalid rating" });

    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    const total = listing.rating * listing.ratingCount + Number(stars);
    listing.ratingCount += 1;
    listing.rating = total / listing.ratingCount;

    await listing.save();
    res.json({ rating: listing.rating, ratingCount: listing.ratingCount });
  } catch {
    res.status(500).json({ error: "Rating failed" });
  }
});

module.exports = router;
