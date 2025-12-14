import { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api
      .get("/orders/admin/all") // if not present, we’ll skip admin for now
      .then((res) => setOrders(res.data.orders || []))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        orders.map((o) => (
          <div key={o._id} className="border p-4 rounded mb-3">
            <p>Order: {o._id}</p>
            <p>Amount: ₹{o.amount}</p>
            <p>Status: {o.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
