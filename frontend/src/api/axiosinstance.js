import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Attach JWT automatically to every request if it exists in localStorage. This is done using an axios interceptor that modifies the request configuration before the request is sent. If a token is found, it adds an Authorization header with the Bearer token to the request.
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(error) => Promise.reject(error)
);

// Repsonse interceptor detects expired access tokens
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        return Promise.reject(error);
      }

      try {
        // Ask backend for a new access token
        const res = await axios.post(`${API_BASE_URL}/api/auth/refresh/`, { refresh });

        const newToken = res.data.access;
        localStorage.setItem("access", newToken);

        // Retry original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
