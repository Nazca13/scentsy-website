import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, getCurrentUser, logout } from '../services/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      setLoading(true);
      const userData = await getCurrentUser();
      setUser(userData);
      setError(null);
    } catch (err) {
      setUser(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      const { user, token } = await login(credentials);
      localStorage.setItem('token', token);
      setUser(user);
      setError(null);
      navigate('/homepage');
      return user;
    } catch (err) {
      setUser(null);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    try {
      setLoading(true);
      const result = await register(userData);
      setError(null);
      navigate('/login');
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    user,
    loading,
    error,
    checkAuth,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout
  };
};