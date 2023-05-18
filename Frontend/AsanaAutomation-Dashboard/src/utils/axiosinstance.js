import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    // Fetch the stored value from local storage
    const storedValue = localStorage.getItem("token");

    // Add the Bearer token to the request header
    config.headers.Authorization = `Bearer ${storedValue}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
