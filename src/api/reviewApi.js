//Api/reviewApi.js 

import API from './index.js';

export const getProductReviews = async (productId) => {
  const response = await API.get(`/api/reviews/product/${productId}`);
  return response.data.reviews || [];
};

export const submitReview = async (reviewData) => {
  const response = await API.post('/api/reviews', reviewData);
  return response.data.review;
};

export const editReview = async (id, updateData) => {
  const response = await API.patch(`/api/reviews/${id}`, updateData);
  return response.data.review;
};

export const deleteReview = async (id) => {
  const response = await API.delete(`/api/reviews/${id}`);
  return response.data;
};