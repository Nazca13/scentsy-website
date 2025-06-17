// src/api/cartApi.js
import API from './index.js';

export const getCart = async () => {
  const response = await API.get('/api/cart');
  return response.data.cart || [];
};

export const getCartItem = async (id) => {
  const response = await API.get(`/api/cart/${id}`);
  return response.data.item || null;
};

export const addToCart = async (itemData) => {
  const response = await API.post('/cart', itemData);
  return response.data.item;
};

export const updateCartItem = async (id, updateData) => {
  const response = await API.patch(`/cart/${id}`, updateData);
  return response.data.item;
};

export const removeFromCart = async (id) => {
  const response = await API.delete(`/cart/${id}`);
  return response.data;
};