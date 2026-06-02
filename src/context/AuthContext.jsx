import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProfile, saveProfile } from '../api/profileApi';
import { API_BASE } from '../config';
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
          return { ...prevUser, ...profile };
        });
      } else if (defaultProfile) {
        const newProfile = await saveProfile(defaultProfile);
        setUser((prevUser) => {
          if (!prevUser || prevUser.id !== userId) return prevUser;
          return { ...prevUser, ...newProfile };
        });
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

  const login = (role, extraData = {}) => {
    // For this prototype, we're simulating a user object based on the role selected
    let userData = { role, ...extraData };

    if (role === 'Student') {
      const studentId = extraData.id || '1200342';
      userData = {
        role,
        name: studentId === '1200342' ? 'Rahul Sharma' : `Student (${studentId})`,
        id: studentId,
        avatar: 'https://i.pravatar.cc/150?img=11',
        department: 'B.Tech CSE',
        email: studentId === '1200342' ? 'rahul.sharma@sbbsu.ac.in' : `student.${studentId}@sbbsu.ac.in`
      };
    } else if (role === 'Admin') {
      const adminId = extraData.id || 'ADMIN-492';
      userData = {
        role,
        name: adminId === 'ADMIN-492' ? 'Dr. Vivek Singh' : `Admin (${adminId})`,
        id: adminId,
        avatar: 'https://i.pravatar.cc/150?img=14',
        department: 'System Administration',
        email: adminId === 'ADMIN-492' ? 'vivek.singh@sbbsu.ac.in' : `admin.${adminId}@sbbsu.ac.in`
      };
    } else if (role === 'Visitor') {
      const visitorName = extraData.name || 'Guest Visitor';
      userData = {
        role,
        name: visitorName,
        id: 'VISITOR_' + visitorName.trim().replace(/\s+/g, '_').toUpperCase(),
        email: `${visitorName.toLowerCase().replace(/\s+/g, '.')}@visitor.com`
      };
    }

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
