import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";
import ListingCard from "../components/ListingCard";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  // URL params
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const location = searchParams.get("location") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const sort = searchParams.get("sort") || "";

  // update URL filters
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set(key, value) : params.delete(key);
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  // load categories
  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data.categories || []))
      .catch(console.error);
  }, []);

  // load listings when filters change
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.get("/listings", {
          params: { search, category, location, min, max, sort },
        });
        setListings(res.data.listings || []);
      } catch {
        setListings([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search, category, location, min, max, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 pb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Browse Listings
      </h1>

      {/* ✅ FILTER BAR (RESTORED) */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-lg shadow mb-6 sticky top-16 z-40"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

          {/* Category */}
          <select
            className="border p-3 rounded-lg"
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

          {/* Location */}
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="border p-3 rounded-lg"
          />

          {/* Min Price */}
          <input
            type="number"
            placeholder="Min Price"
            value={min}
            onChange={(e) => updateFilter("min", e.target.value)}
            className="border p-3 rounded-lg"
          />

          {/* Max Price */}
          <input
            type="number"
            placeholder="Max Price"
            value={max}
            onChange={(e) => updateFilter("max", e.target.value)}
            className="border p-3 rounded-lg"
          />

          {/* Sort */}
          <select
            className="border p-3 rounded-lg"
            value={sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="latest">Latest</option>
            <option value="price_low">Price: Low → High</option>
            <option value="price_high">Price: High → Low</option>
            <option value="popular">Most Popular</option>
          </select>

          {/* Clear */}
          <button
            onClick={clearFilters}
            className="bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Clear
          </button>
        </div>
      </motion.div>

      {/* LISTINGS */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : listings.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <ListingCard key={item._id} listing={item} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-lg">No listings found.</div>
      )}
    </div>
  );
}
