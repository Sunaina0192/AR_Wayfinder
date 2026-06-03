/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  // Track unread announcement count
  const [unreadCount, setUnreadCount] = useState(() => {
    const lastSeen = localStorage.getItem('sbbsu_announcements_last_seen');
    const lastSeenTime = lastSeen ? parseInt(lastSeen, 10) : 0;
    const saved = localStorage.getItem('sbbsu_announcements');

    if (!saved) {
      return 0;
    }

    try {
      const announcements = JSON.parse(saved);
      return announcements.filter(a => a.id > lastSeenTime).length;
    } catch {
      return 0;
    }
  });

  // Calculate unread count by comparing announcements with last-seen timestamp
  const recalculate = useCallback(() => {
    const lastSeen = localStorage.getItem('sbbsu_announcements_last_seen');
    const lastSeenTime = lastSeen ? parseInt(lastSeen, 10) : 0;
    
    const saved = localStorage.getItem('sbbsu_announcements');
    if (!saved) {
      setUnreadCount(0);
      return;
    }

    try {
      const announcements = JSON.parse(saved);
      // Count announcements whose ID (timestamp-based) is newer than lastSeen
      const newCount = announcements.filter(a => a.id > lastSeenTime).length;
      setUnreadCount(newCount);
    } catch {
      setUnreadCount(0);
    }
  }, []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'sbbsu_announcements' || e.key === 'sbbsu_announcements_last_seen') {
        recalculate();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [recalculate]);

  // Called when admin posts a new announcement — recalculate for badge update
  const onNewAnnouncement = useCallback(() => {
    recalculate();
  }, [recalculate]);

  // Called when student/user visits Information Corner — mark all as read
  const markAllRead = useCallback(() => {
    localStorage.setItem('sbbsu_announcements_last_seen', Date.now().toString());
    setUnreadCount(0);
  }, []);

  return (
    <NotificationContext.Provider value={{ unreadCount, onNewAnnouncement, markAllRead, recalculate }}>
      {children}
    </NotificationContext.Provider>
  );
};
