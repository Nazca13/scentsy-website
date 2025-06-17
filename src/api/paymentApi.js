//Api/paymentApi.js

import API from './index.js';

export const getAllPayments = async () => {
  const response = await API.get('/api/payments');
  return response.data.payments || [];
};

export const getMyPayments = async () => {
  const response = await API.get('/api/payments/my');
  return response.data.payments || [];
};

export const checkout = async (paymentData) => {
  const response = await API.post('/api/payments', paymentData);
  return response.data.payment;
};

export const updatePaymentStatus = async (id, status) => {
  const response = await API.patch(`/api/payments/${id}`, { status });
  return response.data.payment;
};

export const deletePayment = async (id) => {
  const response = await API.delete(`/api/payments/${id}`);
  return response.data;
};