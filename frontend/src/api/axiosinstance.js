import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
});

// Attach JWT automatically to every request if it exists in localStorage. This is done using an axios interceptor that modifies the request configuration before the request is sent. If a token is found, it adds an Authorization header with the Bearer token to the request.
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
