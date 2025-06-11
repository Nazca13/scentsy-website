// src/services/userService.js
import API from "../api";

export const fetchUserProfile = async () => {
  const response = await API.get("/profile");
  return response.data.user;
};

export const updateProfile = async (userData) => {
  const response = await API.put("/profile", userData);
  return response.data.user;
};

export const fetchUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};
