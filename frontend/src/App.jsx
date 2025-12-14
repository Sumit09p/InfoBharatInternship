import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Toast from "./components/Toast";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Pages
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyListings from "./pages/MyListings";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminOrders from "./admin/AdminOrders";
import CategoryManager from "./admin/CategoryManager";
import UserManager from "./admin/UserManager";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Toast />

        <Routes>
          {/* ===== PUBLIC (WITH NAVBAR & FOOTER) ===== */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:id" element={<ListingDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* ===== USER PROTECTED ===== */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["buyer", "seller", "admin"]} />
            }
          >
            <Route element={<Layout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
            </Route>
          </Route>

          {/* ===== SELLER ===== */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["seller", "admin"]} />
            }
          >
            <Route element={<Layout />}>
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/edit-listing/:id" element={<EditListing />} />
              <Route path="/my-listings" element={<MyListings />} />
            </Route>
          </Route>

          {/* ===== ADMIN (NO NAVBAR) ===== */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            element={<AdminProtectedRoute />}
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/categories" element={<CategoryManager />} />
            <Route path="/admin/users" element={<UserManager />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
