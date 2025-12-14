import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { showToast } from "../components/Toast";

export default function CreateListing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
    images: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -------------------------------------
  // LOAD CATEGORIES
  // -------------------------------------
  useEffect(() => {
    api.get("/categories")
      .then((res) => {
        const list = res.data.categories || [];
        setCategories(list);
      })
      .catch((err) => console.error("Category load failed", err));
  }, []);

  // -------------------------------------
  // ACCESS RESTRICTION
  // Only sellers can create listings
  // -------------------------------------
  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p>
          Please{" "}
          <a href="/login" className="text-primary-600 font-semibold">login</a>{" "}
          to create a listing.
        </p>
      </div>
    );

  if (user.role !== "seller" && user.role !== "admin")
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center text-red-600">
        <p className="text-lg font-semibold">Access Denied 🚫</p>
        <p>Only <strong>seller accounts</strong> can create listings.</p>
      </div>
    );

  // -------------------------------------
  // HANDLE INPUT
  // -------------------------------------
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // -------------------------------------
  // SUBMIT HANDLER
  // -------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.price || !form.category) {
      setError("Title, price and category are required.");
      return;
    }

    // Validate category exists
    const selectedCategory = categories.find((c) => c._id === form.category);
    if (!selectedCategory) {
      setError("Invalid category selected.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: form.title,
        description: form.description,
        category: form.category,  // ALWAYS ID ✔
        price: Number(form.price),
        location: form.location,
        images: form.images
          ? form.images.split(",").map((i) => i.trim()).filter(Boolean)
          : [],
      };

      const res = await api.post("/listings", payload);

      showToast("Listing created successfully!", "success");

      const newId = res.data?.listing?._id;
      navigate(newId ? `/listings/${newId}` : "/listings");
    } catch (err) {
      console.error("Create listing error:", err);
      const msg = err.response?.data?.error || "Failed to create listing.";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------
  // UI
  // -------------------------------------
  return (
    <div className="min-h-screen flex justify-center px-4 py-12 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-grad-stops))] from-white to-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Create a New Listing
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/20 focus:ring-2 focus:ring-primary-500 outline-none"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/20 h-28 resize-y focus:ring-2 focus:ring-primary-500 outline-none"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/30 border border-white/20 focus:ring-2 focus:ring-primary-500 outline-none"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price (INR)"
              type="number"
              className="w-full p-3 rounded-lg bg-white/30 border border-white/20 focus:ring-2 focus:ring-primary-500 outline-none"
            />

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-3 rounded-lg bg-white/30 border border-white/20 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          <input
            name="images"
            value={form.images}
            onChange={handleChange}
            placeholder="Image URLs (comma separated)"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/20 focus:ring-2 focus:ring-primary-500 outline-none"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-primary-600 text-white shadow hover:scale-[1.02] transition"
            >
              {loading ? "Creating..." : "Create Listing"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
