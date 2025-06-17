//Api/statsApi.js

import API from './index.js';

export const fetchStatsOverview = async () => {
  const response = await API.get('/stats');
  return response.data.stats || {};
};

export const fetchSalesReport = async () => {
  const response = await API.get('/stats/sales-report');
  return response.data.report || {};
};