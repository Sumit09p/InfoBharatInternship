// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../components/Toast";
import api from "../api/axiosClient";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "buyer", // ✅ DEFAULT LOWERCASE
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(), // ✅ IMPORTANT
        phone: form.phone.trim(),
        password: form.password,
        role: form.role.toLowerCase(), // ✅ CRITICAL FIX
      };

      await api.post("/users/register", payload);

      showToast("Registration successful! Please login.", "success");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.error ||
        "Registration failed";

      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center px-4">
      <div
  className="w-full max-w-md bg-white p-8 rounded-2xl
             border border-transparent
             shadow-lg transition-all duration-300
             hover:border-black/20 hover:shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create an Account ✨
        </h2>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded border"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded border"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 rounded border"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded border"
            required
          />

          {/* ROLE SELECT */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Account Type
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 rounded border"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-5 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
