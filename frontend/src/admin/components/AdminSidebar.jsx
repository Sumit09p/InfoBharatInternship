import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, FolderKanban } from "lucide-react";

export default function AdminSidebar() {
  const { pathname } = useLocation();

  const linkStyle = (path) =>
    `flex items-center gap-3 p-3 rounded-lg hover:bg-primary-100 transition ${
      pathname === path ? "bg-primary-200 font-semibold" : ""
    }`;

  return (
    <div className="w-64 bg-white shadow-xl h-screen p-6 fixed left-0 top-0">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="space-y-3">
        <Link to="/admin/dashboard" className={linkStyle("/admin/dashboard")}>
          <LayoutDashboard size={20} /> Dashboard
        </Link>

        <Link to="/admin/categories" className={linkStyle("/admin/categories")}>
          <FolderKanban size={20} /> Categories
        </Link>

        <Link to="/admin/users" className={linkStyle("/admin/users")}>
          <Users size={20} /> Users
        </Link>
      </nav>
    </div>
  );
}
