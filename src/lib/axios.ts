import axios from 'axios';
import { env } from '@/config/env';

export const axiosInstance = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(env.AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error scenarios
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Token expired or invalid, potentially log the user out
        localStorage.removeItem(env.AUTH_TOKEN_KEY);
        // Redirect to login or show a message
      }
    }
    return Promise.reject(error);
  }
); 