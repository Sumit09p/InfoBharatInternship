import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import AdminSidebar from "./components/AdminSidebar";
import StatsCards from "./components/StatsCards";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    categories: 0,
    listings: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const users = await api.get("/users");
      const categories = await api.get("/categories");
      const listings = await api.get("/listings");

      setStats({
        users: users.data.users.length,
        categories: categories.data.categories.length,
        listings: listings.data.listings.length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 ml-64 p-8">
          <h1 className="text-4xl font-bold mb-6">Dashboard Overview</h1>

          <StatsCards stats={stats} />

          <div className="bg-white shadow rounded-xl p-6 border mt-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, Admin 🚀</h2>
            <p className="text-gray-600">
              Use the menu on the left to manage categories and users.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
