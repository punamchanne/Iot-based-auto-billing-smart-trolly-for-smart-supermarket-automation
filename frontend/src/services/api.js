import axios from 'axios';

const api = axios.create({
  baseURL: 'https://iot-based-auto-billing-smart-trolly-for.onrender.com/api',
});

// Adding token to request if available
api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

// Adding response interceptor for 401 handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // CLEAR STORAGE AND FORCE REDIRECT IF TOKEN EXPIRED OR INVALID
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
