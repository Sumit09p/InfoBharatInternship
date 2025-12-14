import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import AdminSidebar from "./components/AdminSidebar";
import Navbar from "../components/Navbar";
import { showToast } from "../components/Toast";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState("");

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data.categories);
  };

  const addCategory = async () => {
    if (!newCat.trim()) return;
    await api.post("/categories", { name: newCat });
    showToast("Category created!", "success");
    setNewCat("");
    loadCategories();
  };

  const deleteCategory = async (id) => {
    await api.delete(`/categories/${id}`);
    showToast("Category deleted!", "success");
    loadCategories();
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-8">
          <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

          <div className="flex gap-3 mb-6">
            <input
              className="border p-3 rounded-lg"
              placeholder="New category"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
            />
            <button
              onClick={addCategory}
              className="bg-primary-600 text-white px-4 rounded-lg"
            >
              Add
            </button>
          </div>

          <div className="bg-white shadow p-6 rounded-xl border">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="p-2">Name</th>
                  <th className="p-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id} className="border-b">
                    <td className="p-2">{cat.name}</td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => deleteCategory(cat._id)}
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
