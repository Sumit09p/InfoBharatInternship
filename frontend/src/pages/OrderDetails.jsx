import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../api/orderApi";
import api from "../api/axiosClient";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchOrderById(id);
        const o = res.data.order;
        setOrder(o);

        // fetch listing info
        if (o?.listingId) {
          const lRes = await api.get(`/listings/${o.listingId}`);
          setListing(lRes.data.listing);
        }
      } catch {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-gray-500">Loading order…</div>;
  }

  if (!order) {
    return <div className="p-8 text-red-500">Order not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-500">Order ID</span>
          <span className="font-mono">{order._id}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Amount</span>
          <span className="font-semibold">₹{order.amount}</span>
        </div>

        <div className="flex gap-3">
          <span className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-600">
            {order.status}
          </span>
          <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">
            {order.paymentStatus}
          </span>
        </div>

        {listing && (
          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">Listing</h3>
            <div className="text-sm">{listing.title}</div>
            <div className="text-sm text-gray-500">
              ₹{listing.price}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
