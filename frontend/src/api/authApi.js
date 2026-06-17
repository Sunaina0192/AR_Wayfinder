import api from './axiosConfig';

export const fetchLogins = async (userId) => {
  const response = await api.get(`/api/auth/logins?userId=${encodeURIComponent(userId || '')}`);
  return response.data;
};
