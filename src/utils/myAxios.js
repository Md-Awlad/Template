import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setAccessToken,
} from "./localStorages";

// const baseURL = "https://api.nexismenu.live";
export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.nexismenu.live/api"
    : "http://10.27.27.32:8000/api";
// const baseURL = "https://api.nexismenu.live";
//export const baseURL = "http://10.27.27.32:8000";

const myAxios = axios.create({ baseURL });
export const staticAxios = axios.create({ baseURL });
// Add a request interceptor
myAxios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
myAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalConfig = error.config;
    const refresh = getRefreshToken();
    if (error.response.status === 401 && !originalConfig._retry && refresh) {
      originalConfig._retry = true;
      const res = await axios.post(`${baseURL}/token/refresh/`, {
        refresh,
      });
      if (res.status === 200) {
        setAccessToken(res.data.access);
        return myAxios(originalConfig);
      } else {
        removeTokens();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await myAxios(`${queryKey[0]}`);
  return data;
};

export default myAxios;
