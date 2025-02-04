import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      error.message = `Request failed with status ${error.response.status}: ${error.response.data.message || "Unknown error"}`;
    }
    return Promise.reject(error);
  }
);

export default httpClient;
