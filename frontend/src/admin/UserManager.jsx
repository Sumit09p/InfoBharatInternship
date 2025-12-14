import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import AdminSidebar from "./components/AdminSidebar";
import Navbar from "../components/Navbar";
import { showToast } from "../components/Toast";

export default function UserManager() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data.users);
  };

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    showToast("User deleted", "success");
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 ml-64 p-8">
          <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

          <div className="bg-white shadow p-6 rounded-xl border">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                  <th className="p-2 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2 capitalize">{u.role}</td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}
