import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Pages
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditListing from "./pages/EditListing";
import MyListings from "./pages/MyListings";



// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import CategoryManager from "./admin/CategoryManager";
import UserManager from "./admin/UserManager";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Toast />

        <Routes>

          {/* ===== PUBLIC WITH NAVBAR ===== */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />

          <Route
            path="/listings"
            element={
              <>
                <Navbar />
                <Listings />
                <Footer />
              </>
            }
          />

          <Route
            path="/listings/:id"
            element={
              <>
                <Navbar />
                <ListingDetails />
                <Footer />
              </>
            }
          />
          <Route
             path="/my-listings"
             element={
              <ProtectedRoute allowedRoles={["seller", "admin"]}>
              <>
              <Navbar />
              <MyListings />
               <Footer />
               </>
             </ProtectedRoute>
             }
            />


          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            }
          />

          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            }
          />

          {/* ===== USER PROTECTED ===== */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["buyer", "seller", "admin"]}>
                <>
                  <Navbar />
                  <Profile />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />

          {/* ===== SELLER ===== */}
          <Route
            path="/create-listing"
            element={
              <ProtectedRoute allowedRoles={["seller", "admin"]}>
                <>
                  <Navbar />
                  <CreateListing />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-listing/:id"
            element={
              <ProtectedRoute allowedRoles={["seller", "admin"]}>
                <>
                  <Navbar />
                  <EditListing />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />

          {/* ===== ADMIN (NO NAVBAR) ===== */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <AdminProtectedRoute>
                <CategoryManager />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminProtectedRoute>
                <UserManager />
              </AdminProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}
