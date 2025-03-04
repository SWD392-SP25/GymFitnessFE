import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for existing auth data
    const user = localStorage.getItem('gymFitnessUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Mock login function - replace with real authentication
  const login = (email, password) => {
    // In a real app, this would validate against a backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo user data (replace with real authentication)
        const user = {
          id: '1',
          name: 'Demo User',
          email: email,
          role: email.includes('pt') ? 'PT' : 'customer'
        };
        
        setCurrentUser(user);
        localStorage.setItem('gymFitnessUser', JSON.stringify(user));
        resolve(user);
      }, 800);
    });
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('gymFitnessUser');
    navigate('/');
  };

  // Sign up function
  const signup = (name, email, password, role) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo user data (replace with real registration)
        const user = {
          id: Date.now().toString(),
          name: name,
          email: email,
          role: role || 'customer'
        };
        
        setCurrentUser(user);
        localStorage.setItem('gymFitnessUser', JSON.stringify(user));
        resolve(user);
      }, 800);
    });
  };

  const value = {
    currentUser,
    login,
    logout,
    signup,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin',
    isPT: currentUser?.role === 'PT',
    isCustomer: currentUser?.role === 'customer',
    isStaff: currentUser?.role === 'staff'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;