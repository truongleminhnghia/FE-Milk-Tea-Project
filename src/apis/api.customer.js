import axios from "axios";

//const baseURL = import.meta.env.VITE_BECKEND_URL;
const baseURL = "https://localhost:7190/api/v1/"
const config = {
  baseURL: baseURL,
  timeout: 3000000,
  headers: {
    'Content-Type': 'application/json',
  },
  //withCredentials: true,
};

const instance = axios.create(config);

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token")?.replaceAll('"', "");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found in localStorage");
    }
    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response?.data ? response.data : response;
  },
  (error) => {
    console.error("Error in response interceptor:", error);
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default instance;
