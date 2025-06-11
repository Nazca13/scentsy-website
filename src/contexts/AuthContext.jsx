import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login as apiLogin, logout as apiLogout } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { user, token } = await apiLogin({ email, password });
      localStorage.setItem('token', token);
      setUser(user);
      return user;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      localStorage.removeItem('token');
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);