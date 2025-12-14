// src/admin/AdminLayout.jsx
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main admin content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
