import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../components/Toast";

export default function Profile() {
  const { user, saveUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    avatarUrl: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        avatarUrl: user.avatarUrl || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        avatarUrl: form.avatarUrl,
        ...(form.password && { password: form.password }),
      };

      const res = await api.put("/users/me", payload);
      saveUser(res.data.user);
      showToast("Profile updated successfully!", "success");
    } catch {
      showToast("Update failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-xl p-8 shadow">
        <h2 className="text-3xl font-bold mb-6">My Profile</h2>

        {form.avatarUrl && (
          <div className="flex justify-center mb-4">
            <img
              src={form.avatarUrl}
              alt="avatar"
              className="h-24 w-24 rounded-full object-cover border"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded border"
            placeholder="Name"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 rounded border"
            placeholder="Phone"
          />

          <input
            name="avatarUrl"
            value={form.avatarUrl}
            onChange={handleChange}
            placeholder="Avatar Image URL"
            className="w-full p-3 rounded border"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="New Password (optional)"
            className="w-full p-3 rounded border"
          />

          <button className="bg-primary-600 text-white px-6 py-2 rounded">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
