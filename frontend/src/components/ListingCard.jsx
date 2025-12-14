import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import api from "../api/axiosClient";
import { showToast } from "./Toast";

export default function ListingCard({ listing, showActions = false }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!confirm("Delete this listing?")) return;

    try {
      await api.delete(`/listings/${listing._id}`);
      showToast("Listing deleted", "success");
      window.location.reload();
    } catch {
      showToast("Delete failed", "error");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition relative">

      <Link to={`/listings/${listing._id}`}>
        <img
          src={listing.images?.[0] || "/hero-placeholder.png"}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      </Link>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{listing.title}</h3>
        <p className="text-primary-600 font-bold">
          ₹{listing.price?.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">{listing.location}</p>
      </div>

      {/* 🔐 ACTIONS ONLY WHEN EXPLICITLY ENABLED */}
      {showActions && (
        <div className="absolute top-2 right-2 flex gap-2 bg-white p-1 rounded-lg shadow">
          <button onClick={() => navigate(`/edit-listing/${listing._id}`)}>
            <Edit size={16} />
          </button>
          <button onClick={handleDelete} className="text-red-600">
            <Trash size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
