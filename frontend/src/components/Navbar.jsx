import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ShoppingBag,
  LogOut,
  Plus,
  Shield,
  User,
  List
} from "lucide-react";
import { showToast } from "./Toast";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully!", "success");
    navigate("/");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag className="text-primary-600" />
          <span className="font-bold text-xl">BabbaFly</span>
        </Link>

        {/* CENTER LINKS */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="px-3 py-2 rounded-lg transition
                       hover:bg-black/5 hover:shadow-sm"
          >
            Home
          </Link>

          <Link
            to="/listings"
            className="px-3 py-2 rounded-lg transition
                       hover:bg-black/5 hover:shadow-sm"
          >
            Browse
          </Link>

          {/* SELLER LINKS */}
          {user?.role === "seller" && (
            <>
              <Link
                to="/create-listing"
                className="px-3 py-2 rounded-lg flex items-center gap-1
                           transition hover:bg-black/5 hover:shadow-sm"
              >
                <Plus size={16} /> Create Listing
              </Link>

              <Link
                to="/my-listings"
                className="px-3 py-2 rounded-lg flex items-center gap-1
                           transition hover:bg-black/5 hover:shadow-sm"
              >
                <List size={16} /> My Listings
              </Link>
            </>
          )}

          {/* ADMIN LINK */}
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="px-3 py-2 rounded-lg flex items-center gap-1
                         text-blue-600 transition
                         hover:bg-blue-50 hover:shadow-sm"
            >
              <Shield size={16} /> Admin
            </Link>
          )}
        </div>

        {/* RIGHT AUTH */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-3 py-2 rounded-lg
                           hover:bg-black/5 hover:shadow-sm transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-3 py-2 rounded-lg
                           hover:bg-black/5 hover:shadow-sm transition"
              >
                Sign Up
              </Link>

              <Link
                to="/admin/login"
                className="px-3 py-2 rounded-lg text-blue-600
                           hover:bg-blue-50 hover:shadow-sm transition"
              >
                Admin Login
              </Link>
            </>
          ) : (
            <>

            {/* 🔹 MY ORDERS (NEW) */}
             <Link
                to="/my-orders"
                className="px-3 py-2 rounded-lg hover:bg-black/5 hover:shadow-sm transition"
              >
               My Orders
             </Link>
             
              <Link
                to="/profile"
                className="px-3 py-2 rounded-lg flex items-center gap-2
                           hover:bg-black/5 hover:shadow-sm transition"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    className="h-8 w-8 rounded-full object-cover border"
                    onError={(e) =>
                      (e.target.src = "/default-avatar.png")
                    }
                  />
                ) : (
                  <User size={18} />
                )}
                <span>{user.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg flex items-center gap-1
                           text-red-600 hover:bg-red-50 hover:shadow-sm transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
