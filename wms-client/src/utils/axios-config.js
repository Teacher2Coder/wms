import axios from 'axios';

// Set up axios defaults
axios.defaults.baseURL = 'https://localhost:7186'; // Adjust this to match your API URL

// Request interceptor to add token to headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Only auto-logout if the request was to an auth endpoint or had a token
      const wasAuthenticatedRequest = error.config?.headers?.Authorization;
      const isAuthEndpoint = error.config?.url?.includes('/auth/');
      
      if (wasAuthenticatedRequest && !isAuthEndpoint) {
        console.log('Authentication failed - token may be expired');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        
        // Redirect to login page if not already there
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
