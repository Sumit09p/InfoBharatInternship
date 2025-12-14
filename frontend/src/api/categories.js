import axiosClient from './axiosClient';

export const categoriesAPI = {
  getAll: async () => {
    const response = await axiosClient.get('/categories');
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosClient.get(`/categories/${id}`);
    return response.data;
  },

  getListingsByCategory: async (id) => {
    const response = await axiosClient.get(`/categories/${id}/listings`);
    return response.data;
  },
};

