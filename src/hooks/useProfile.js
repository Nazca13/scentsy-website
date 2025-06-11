// src/hooks/useProfile.js
import { useState, useEffect } from 'react';
import { 
  fetchUserProfile, 
  updateProfile 
} from '../services/userService';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk fetch data profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const userData = await fetchUserProfile();
      setProfile(userData);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat profil");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk update profile
  const updateUserProfile = async (userData) => {
    try {
      setLoading(true);
      const updatedProfile = await updateProfile(userData);
      setProfile(updatedProfile);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Gagal memperbarui profil";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch saat komponen mount
  useEffect(() => {
    fetchProfile();
  }, []);

  return { 
    profile, 
    loading, 
    error, 
    refresh: fetchProfile,
    updateProfile: updateUserProfile 
  };
};