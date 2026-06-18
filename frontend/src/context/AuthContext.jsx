import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('sbbsu_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sbbsu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sbbsu_user');
    }
  }, [user]);

  const login = async (role, extraData = {}) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { role, ...extraData });
      
      const { user: userData, token } = response.data;
      
      setUser({
        ...userData,
        token // store JWT token in the user object
      });

    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (regData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, regData);
      
      const { user: userData, token } = response.data;
      
      setUser({
        ...userData,
        token
      });

      return response.data;

    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('sbbsu_user');
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, ...updatedData };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, register }}>
      {children}
    </AuthContext.Provider>
  );
};
