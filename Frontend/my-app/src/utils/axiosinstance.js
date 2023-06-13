import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const storedValue = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${storedValue}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
