import axiosClient from './axiosClient';

export const authAPI = {
  register: async (userData) => {
    const response = await axiosClient.post('/users/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axiosClient.post('/users/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosClient.get('/users/me');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await axiosClient.put('/users/me', userData);
    return response.data;
  },
};

