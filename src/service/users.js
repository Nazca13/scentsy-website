import API from '../api';

export const fetchUsers = async () => {
  const response = await API.get('/users');
  return response.data;
};

export const deleteUser = async (id) => {
  return await API.delete(`/users/${id}`);
};