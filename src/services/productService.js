// src/services/productService.js
import API from '../api';

export const fetchProducts = async (params = {}) => {
  const response = await API.get('/products', { params });
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const formData = new FormData();
  
  Object.entries(productData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const response = await API.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await API.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};
