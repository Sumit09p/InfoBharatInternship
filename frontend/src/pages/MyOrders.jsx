import { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders/my")
      .then((res) => setOrders(res.data.orders || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading orders...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white rounded-xl p-5 border shadow-sm hover:shadow-md"
            >
              <p className="font-semibold">
                {o.listingId?.title}
              </p>
              <p>Amount: ₹{o.amount}</p>
              <p>Status: {o.status}</p>
              <p className="text-sm text-gray-500">
                {new Date(o.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
