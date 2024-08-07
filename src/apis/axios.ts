import axios from "axios";
import useAuthStore from "../store/AuthStore";

const defaultInstance = axios.create({
  baseURL: "http://3.36.108.91:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

const authInstance = axios.create({
  baseURL: "http://3.36.108.91:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가
authInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { defaultInstance, authInstance };
