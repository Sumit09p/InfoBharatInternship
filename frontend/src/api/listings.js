import axiosClient from './axiosClient';

export const listingsAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.location) params.append('location', filters.location);
    if (filters.price) params.append('price', filters.price);
    if (filters.sort) params.append('sort', filters.sort);

    const response = await axiosClient.get(`/listings?${params.toString()}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosClient.get(`/listings/${id}`);
    return response.data;
  },

  create: async (listingData) => {
    const response = await axiosClient.post('/listings', listingData);
    return response.data;
  },

  update: async (id, listingData) => {
    const response = await axiosClient.put(`/listings/${id}`, listingData);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosClient.delete(`/listings/${id}`);
    return response.data;
  },
};

