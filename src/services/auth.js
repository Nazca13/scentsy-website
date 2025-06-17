//services/auth.js

import API from '../Api';

export const login = async (credentials) => {
  try {
    const response = await API.post('/api/auth/signin', credentials); // ✅ Disesuaikan
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const register = async (userData) => {
  try {
    const response = await API.post('/api/auth/signup', userData); // ✅ Disesuaikan
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await API.get('/api/users/me'); // ✅ Ganti dari /profile ke /api/users/me
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user data");
  }
};

export const logout = async () => {
  try {
    await API.post('/api/auth/signout'); // ✅ Disesuaikan
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};