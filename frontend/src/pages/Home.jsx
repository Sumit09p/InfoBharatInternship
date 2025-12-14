import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import FeaturedCarousel from "../components/FeaturedCarousel";
import CategoryCard from "../components/CategoryCard";
import { motion } from "framer-motion";
import heroImage from "../assets/Heroimage.png";



export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [lRes, cRes] = await Promise.all([
          api.get("/listings?sort=popular&limit=9"),
          api.get("/categories"),
        ]);

        setFeatured(lRes.data.listings || []);
        setCategories(cRes.data.categories || []);
      } catch (err) {
        console.error("Home load error", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const runSearch = () => {
    const q = searchText.trim();
    if (q.length === 0) return;
    navigate(`/listings?search=${encodeURIComponent(q)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO */}
      <header className="bg-white rounded-b-2xl border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid lg:grid-cols-2 gap-8">

          <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Buy & Sell locally
              <span className="text-primary-600"> with confidence.</span>
            </h1>

            <p className="mt-4 text-lg text-slate-600 max-w-xl">
              A simple, fast and secure marketplace for great deals.
            </p>

            <div className="mt-8 flex gap-4">
              <a href="/create-listing" className="px-6 py-3 bg-primary-600 text-white rounded-lg shadow hover:shadow-lg transition">
                Create Listing
              </a>
              <a href="/listings" className="px-6 py-3 bg-white border rounded-lg text-slate-900 shadow-sm hover:shadow transition">
                Explore Listings
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}>
            <div className="w-full max-w-lg rounded-2xl overflow-hidden
                shadow-[0_20px_45px_rgba(0,0,0,0.18)]
                border bg-gradient-to-br from-white to-slate-50">

              <img
  src={heroImage}
  alt="Local marketplace hero illustration"
  className="w-full h-72 object-cover"
/>

            </div>
          </motion.div>

        </div>
      </header>

      {/* SEARCH BOX */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 -mt-8 mb-10">
        <div className="bg-white rounded-xl shadow-md border p-4 flex items-center gap-3">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search title, location, or category"
            className="flex-1 p-3 rounded-md bg-slate-50 border focus:border-primary-300"
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
          />

          <button
            onClick={runSearch}
            className="px-5 py-2 bg-primary-600 text-white rounded-md shadow hover:bg-primary-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Top Categories</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
              ))
            : categories.map((c) => <CategoryCard key={c._id} category={c} />)}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-10 mb-20">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-800">Featured Listings</h3>
          <a href="/listings" className="text-primary-600 text-sm">Browse all</a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <FeaturedCarousel items={featured} />
        )}
      </section>

    </div>
  );
}
