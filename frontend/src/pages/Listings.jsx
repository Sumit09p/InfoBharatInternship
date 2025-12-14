import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";
import ListingCard from "../components/ListingCard";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // searchParams + setter for URL-driven filters (no reload)
  const [searchParams, setSearchParams] = useSearchParams();

  // derive values from URL
  const category = searchParams.get("category") || "";
  const location = searchParams.get("location") || "";
  const minPrice = searchParams.get("min") || "";
  const maxPrice = searchParams.get("max") || "";
  const sort = searchParams.get("sort") || "";

  // setSearchParams wrapper (keeps other params intact)
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "") params.set(key, value);
    else params.delete(key);
    // set params (this updates URL and re-triggers effects)
    setSearchParams(params);
  };

  // clear filters
  const clearFilters = () => {
    setSearchParams({});
  };

  // Load categories once
  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => console.error("Category load error:", err));
  }, []);

  // Load listings whenever URL filters change
  useEffect(() => {
    let cancelled = false;
    async function loadListings() {
      setLoading(true);

      const params = {};
      if (category) params.category = category;
      if (location) params.location = location;
      if (minPrice) params.min = minPrice;
      if (maxPrice) params.max = maxPrice;
      if (sort) params.sort = sort;

      try {
        // build query string automatically by axios params
        const res = await api.get("/listings", { params });
        if (cancelled) return;
        setListings(res.data.listings || []);
      } catch (err) {
        if (!cancelled) {
          console.error("Listings load error:", err);
          setListings([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadListings();

    return () => {
      cancelled = true;
    };
  }, [category, location, minPrice, maxPrice, sort, searchParams, setSearchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 pb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Listings</h1>

      {/* Sticky Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-lg shadow mb-6 sticky top-16 z-40 backdrop-blur-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

          {/* Category */}
          <select
            className="border p-3 rounded-lg text-gray-700 w-full"
            value={category}
            onChange={(e) => updateFilter("category", e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Location (auto-applies as you type) */}
          <input
            type="text"
            placeholder="Location (e.g., Mumbai)"
            value={location}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="border p-3 rounded-lg text-gray-700 w-full"
          />

          {/* Min Price */}
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => updateFilter("min", e.target.value)}
            className="border p-3 rounded-lg text-gray-700 w-full"
          />

          {/* Max Price */}
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => updateFilter("max", e.target.value)}
            className="border p-3 rounded-lg text-gray-700 w-full"
          />

          {/* Sort */}
          <select
            className="border p-3 rounded-lg text-gray-700 w-full"
            value={sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="latest">Latest</option>
            <option value="price_low">Price: Low → High</option>
            <option value="price_high">Price: High → Low</option>
            <option value="popular">Most Popular</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition w-full"
            type="button"
          >
            Clear Filters
          </button>
        </div>
      </motion.div>

      {/* Listings Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : listings.length ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <ListingCard key={item._id} listing={item} />
          ))}
        </motion.div>
      ) : (
        <div className="text-gray-500 text-lg">No listings found.</div>
      )}
    </div>
  );
}
