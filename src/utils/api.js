import axios from "axios";

const token = localStorage.getItem("token");

const API = axios.create({
  baseURL: "https://breakable-plum-dalmatian.cyclic.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// passing query directly on every request
API.interceptors.request.use((config) => {
  const query = window.location.search || "";
  config.url = config.url + query;
  return config;
});

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle error
    throw error;
  }
);

export default API;
