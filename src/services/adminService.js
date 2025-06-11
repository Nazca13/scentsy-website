import API from './api';

export const fetchAdminData = async () => {
  try {
    const response = await API.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch admin data');
  }
};

export const fetchUsers = async () => {
  try {
    const response = await API.get('/admin/users');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};