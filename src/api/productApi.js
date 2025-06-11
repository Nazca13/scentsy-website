// src/api/productApi.js
import API from "./index";

export const fetchProducts = async (params = {}) => {
  const response = await API.get("/products", { params });
  return response.data.products || [];
};

export const fetchProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data.product || null;
};