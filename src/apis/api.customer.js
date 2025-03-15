import axios from "axios";

//const baseURL = import.meta.env.VITE_BECKEND_URL;
// const baseURL = "https://be-milk-tea-project.onrender.com/api/v1/"
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
    const token = localStorage.getItem("access_token")?.replaceAll('"', "");
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
    if (response?.data) {
      console.log("response", response)
      return response.data;
    }
  },
  (error) => {
    console.error("Error in response interceptor:", error.response);
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    }
    // return Promise.reject(error?.response?.data);
  }
);

export default instance;
