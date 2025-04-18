import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'http://localhost:8802/api',
  withCredentials: true,
});

// Global interceptor to handle 401 errors
apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiRequest;