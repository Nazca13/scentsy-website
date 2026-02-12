//contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - always success for demo
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser = {
      _id: 'user_123',
      name: 'Demo User',
      email: email,
      role: email.includes('admin') ? 'admin' : 'user',
      avatar: '/default-profile.jpg'
    };

    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setUser(mockUser);
    return { user: mockUser, token: 'mock-token-123' };
  };

  const logout = async () => {
    localStorage.removeItem('mockUser');
    setUser(null);
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