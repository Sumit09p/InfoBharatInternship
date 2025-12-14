import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../components/Toast";

export default function EditListing() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  // LOAD EXISTING LISTING
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        const data = res.data.listing;

        setForm({
          title: data.title,
          description: data.description,
          category: data.category,
          price: data.price,
          location: data.location,
          images: data.images?.join(", "),
        });
      } catch (err) {
        showToast("Listing not found", "error");
      } finally {
        setLoading(false);
      }
    })();

    api.get("/categories").then((res) => setCategories(res.data.categories));
  }, [id]);

  // Ensure only owner/admin can edit
  if (!user) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        images: form.images
          ? form.images.split(",").map((i) => i.trim())
          : [],
      };

      await api.put(`/listings/${id}`, payload);
      showToast("Listing updated successfully!", "success");

      navigate(`/listings/${id}`);
    } catch (err) {
      showToast("Failed to update listing", "error");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen px-4 py-12 flex justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-8 bg-white rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-6">Edit Listing</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

        <label className="block font-semibold mt-4 mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 rounded border"
          />

        <label className="block font-semibold mt-4 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full h-24 p-3 rounded border"
          />

        <label className="block font-semibold mt-4 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded border"
          >
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

        <label className="block font-semibold mt-4 mb-1">Price (INR)</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            className="w-full p-3 rounded border"
          />

        <label className="block font-semibold mt-4 mb-1">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-3 rounded border"
          />

        <label className="block font-semibold mt-4 mb-1">Images (comma-separated URLs)</label>
          <input
            name="images"
            value={form.images}
            onChange={handleChange}
            className="w-full p-3 rounded border"
          />

          <button className="bg-primary-600 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
