import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import StarRating from "../components/StarRating";
import { showToast } from "../components/Toast";
import { useAuth } from "../context/AuthContext";

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [listing, setListing] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);
      try {
        const res = await api.get(`/listings/${id}`);
        const l = res.data.listing;
        setListing(l);
        setRating(l.rating || 0);

        if (l?.sellerId) {
          const sres = await api.get(`/users/${l.sellerId}`);
          setSeller(sres.data.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const rateListing = async (stars) => {
    try {
      const res = await api.post(`/listings/${listing._id}/rate`, { stars });
      setRating(res.data.rating);
      showToast("Thanks for rating ⭐", "success");
    } catch {
      showToast("Rating failed", "error");
    }
  };

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!listing)
    return <div className="min-h-screen flex items-center justify-center">Listing not found</div>;

  const mainImage = listing.images?.[0] || "/hero-placeholder.png";

  return (
    <div className="min-h-screen px-4 py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow"
        >
          <img
            src={mainImage}
            alt={listing.title}
            className="w-full h-72 object-cover rounded-lg"
          />

          <h1 className="text-2xl font-bold mt-4">{listing.title}</h1>
          <p className="text-gray-600 mt-2">{listing.description}</p>

          <div className="mt-4 flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold text-primary-600">
                ₹{Number(listing.price).toLocaleString()}
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {listing.location}
              </div>
            </div>

            {rating > 0 && (
              <div className="flex items-center text-yellow-500">
                <Star className="h-5 w-5 fill-yellow-500" />
                <span className="ml-1 font-semibold">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.aside
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow"
        >
          <h3 className="text-lg font-semibold">Seller</h3>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-xl font-bold">
              {seller?.name?.[0]?.toUpperCase() || "S"}
            </div>
            <div className="font-semibold">{seller?.name || "Unknown Seller"}</div>
          </div>

          {/* ⭐ BUYER RATING */}
          {user?.role === "buyer" && (
            <div className="mt-6">
              <p className="font-semibold mb-1">Rate this product</p>
              <StarRating value={rating} onRate={rateListing} />
            </div>
          )}

          {/* CONTACT */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => setShowContact(!showContact)}
              className="w-full py-2 rounded-lg bg-primary-600 text-white"
            >
              {showContact ? "Hide Contact" : "Contact Seller"}
            </button>

            {showContact && (
              <div className="p-3 bg-gray-50 rounded-lg animate-slideIn">
                <p><strong>Email:</strong> {seller?.email || "N/A"}</p>
                <p className="mt-1"><strong>Phone:</strong> {seller?.phone || "N/A"}</p>
              </div>
            )}

            <button
              onClick={() => navigate(-1)}
              className="w-full py-2 rounded-lg bg-gray-200"
            >
              Back
            </button>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
