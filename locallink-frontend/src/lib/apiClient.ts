import axios from 'axios';

// Create a configured Axios instance
export const apiClient = axios.create({
  // Point this to your backend's URL. Once deployed, you'll change this to your production URL using .env vars.
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to automatically attach the Auth token if it exists
apiClient.interceptors.request.use(
  (config) => {
    // Depending on where you store the token (localStorage, cookies, or Context)
    // Assuming localStorage for a typical setup:
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
