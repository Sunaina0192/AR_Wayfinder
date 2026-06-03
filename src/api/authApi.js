import { API_BASE_URL } from '../config';

export const loginUser = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export const fetchLogins = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logins?userId=${encodeURIComponent(userId || '')}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch login history');
  }

  return response.json();
};
