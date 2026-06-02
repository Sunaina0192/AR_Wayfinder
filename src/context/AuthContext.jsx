import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProfile, saveProfile } from '../api/profileApi';
import { loginUser } from '../api/authApi';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('sbbsu_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const fetchAndSyncProfile = async (userId, defaultProfile = null) => {
    try {
      const profile = await fetchProfile(userId);
      if (profile) {
        setUser((prevUser) => {
          if (!prevUser || prevUser.id !== userId) return prevUser;
          // Only sync avatar and department — never override name from login input
          return {
            ...prevUser,
            avatar: profile.avatar || prevUser.avatar,
            department: profile.department || prevUser.department,
          };
        });
      } else if (defaultProfile) {
        await saveProfile(defaultProfile);
      }
    } catch (error) {
      console.error('Error syncing profile with backend:', error);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('sbbsu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sbbsu_user');
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role !== 'Visitor') {
      fetchAndSyncProfile(user.id);
    }
  }, []);

  const login = async (role, extraData = {}) => {
    try {
      const userData = await loginUser({ role, ...extraData });
      setUser(userData);

      if (role !== 'Visitor') {
        fetchAndSyncProfile(userData.id, {
          userId: userData.id,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
          department: userData.department
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
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
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
