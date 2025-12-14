import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";
import ListingCard from "../components/ListingCard";
import { useNavigate } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { showToast } from "../components/Toast";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadListings() {
      try {
        const res = await api.get("/listings/my");
        setListings(res.data.listings || []);
      } catch {
        showToast("Failed to load listings", "error");
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  const deleteListing = async (id) => {
    if (!confirm("Delete this listing?")) return;

    try {
      await api.delete(`/listings/${id}`);
      showToast("Listing deleted", "success");
      setListings((prev) => prev.filter((l) => l._id !== id));
    } catch {
      showToast("Delete failed", "error");
    }
  };

  if (loading) return <div className="min-h-[70vh] p-8">Loading...</div>;

  return (
    <div className="min-h-[70vh] max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>

      {listings.length === 0 ? (
        <p className="text-gray-500">You haven’t created any listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing._id} className="relative">
              <ListingCard listing={listing} />

              {/* ACTIONS */}
              <div className="absolute top-2 right-2 flex gap-2 bg-white/90 p-1 rounded-lg shadow">
                <button
                  onClick={() => navigate(`/edit-listing/${listing._id}`)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Edit size={16} />
                </button>

                <button
                  onClick={() => deleteListing(listing._id)}
                  className="p-2 hover:bg-red-100 text-red-600 rounded"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
