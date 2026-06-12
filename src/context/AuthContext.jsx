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

  // Unified Login: Just email and password
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      
      const { user: userData, token } = response.data;
      
      setUser({
        ...userData,
        token // store JWT token in the user object
      });

      return userData; // Return userData to allow caller to inspect the role and route accordingly
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (regData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, regData);
      return response.data; // Return success message (no auto-login, needs OTP)
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, { email, otp });
      return response.data;
    } catch (error) {
      console.error('OTP Verification failed:', error);
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
      return response.data;
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw error;
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, { email, otp, newPassword });
      return response.data;
    } catch (error) {
      console.error('Reset password failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, ...updatedData };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, register, verifyOTP, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
