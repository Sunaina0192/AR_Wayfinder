import api from './axiosConfig';

export const fetchNotifications = async () => {
  const response = await api.get('/api/data/notifications');
  return response.data;
};

export const fetchAttendance = async () => {
  const response = await api.get('/api/data/attendance');
  return response.data;
};

export const fetchFees = async () => {
  const response = await api.get('/api/data/fees');
  return response.data;
};

export const fetchResults = async () => {
  const response = await api.get('/api/data/results');
  return response.data;
};

export const fetchCourses = async () => {
  const response = await api.get('/api/data/courses');
  return response.data;
};
