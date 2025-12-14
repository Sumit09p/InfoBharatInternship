import api from "./axiosClient";

// Create order
export const createOrder = (data) => {
  return api.post("/orders", data);
};

// Get orders for logged-in user
export const fetchMyOrders = (userId) => {
  return api.get(`/orders/${userId}`);
};

// Get single order
export const fetchOrderById = (id) => {
  return api.get(`/orders/order/${id}`);
};
