import { store } from '@/store/store';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const { auth } = store.getState(); // Access Redux state
    const accessToken = auth?.accessToken; // Get access token from auth slice
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { auth } = store.getState(); // Access Redux state
      const refreshToken = auth?.refreshToken; // Get refresh token from auth slice

      const host = window.location.host;
      const arr = host.split('.').slice(0, host.includes('localhost') ? -1 : -2);
      const subDomain = arr.length > 0 ? arr[0] : '';

      let url = 'api/auth/refresh-token';

      if (subDomain === 'admin') {
        if (import.meta.env.VITE_API_BASE_URL === 'http://localhost:5000') {
          url = '/api/auth/refresh-token';
        } else {
          url = 'api/auth/refresh-token';
        }
      }

      if (subDomain === 'vendor') {
        url = '/api/auth/refresh-token-vendors';
        if (import.meta.env.VITE_API_BASE_URL === 'http://localhost:5000') {
          url = '/api/auth/refresh-token-vendors';
        } else {
          url = 'api/auth/refresh-token-vendors';
        }
      }

      if (refreshToken) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${url}`, { refreshToken });
          const newAccessToken = response.data.accessToken;
          // Update Redux state with new token
          store.dispatch({
            type: 'auth/updateAccessToken',
            payload: newAccessToken,
          });

          // Update original request's authorization header
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest); // Retry original request
        } catch (error) {
          // Handle token refresh failure
          store.dispatch({ type: 'auth/logout' }); // Example: Logout user
        }
      }
    }
    return Promise.reject(error);
  },
);
