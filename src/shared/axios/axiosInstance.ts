import { toast } from "@/hooks/use-toast";
import { store } from "@/store/store";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
  }
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
      // const { auth } = store.getState(); // Access Redux state
      // const refreshToken = auth?.refreshToken; // Get refresh token from auth slice
      // const host = window.location.host;
      // const arr = host.split('.').slice(0, host.includes('localhost') ? -1 : -2);
      // const subDomain = arr.length > 0 ? arr[0] : '';

      const url = "/api/auth/refresh-token";

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = response.data.tokens.accessToken;
        // Update Redux state with new token
        store.dispatch({
          type: "auth/updateAccessToken",
          payload: newAccessToken,
        });

        // Update original request's authorization header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest); // Retry original request
      } catch (error: unknown) {
        // Handle token refresh failure
        toast({
          variant: "destructive",
          description: `Failed to refresh token. Please log in again. ${error}`,
        });
        store.dispatch({ type: "auth/logout" }); // Example: Logout user
      }
    }
    return Promise.reject(error);
  }
);
