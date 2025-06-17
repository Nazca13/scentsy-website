//services/userService.js

import API from '../Api';

export const fetchUsers = async () => {
  const response = await API.get('/api/users');
  return response.data.users || [];
};

export const fetchUserProfile = async () => {
  const response = await API.get('/api/users/me'); 
  return response.data.user;
};


export const updateProfile = async (userData) => {
  const response = await API.patch('/api/users/me', userData); 
  return response.data.user;
};
