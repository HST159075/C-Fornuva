import axios, { AxiosError, AxiosResponse } from "axios";

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Important for Better Auth cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for handling global responses/errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access - Please login");
    }
    return Promise.reject(error);
  }
);

export default api;
