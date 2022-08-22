import axios from "axios";
// import {
//   getAccessToken,
//   getRefreshToken,
//   removeTokens,
//   setAccessToken,
// } from "./localStorages";

const baseURL = "https://api.neuvemirestro.com";
// const baseURL = "http://127.0.0.1:8000";

const myAxios = axios.create({ baseURL, withCredentials: true });

// Add a request interceptor
// myAxios.interceptors.request.use(
//   function (config) {
//     config.headers.Authorization = `Bearer ${getAccessToken()}`;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
// myAxios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error) {
//     const originalConfig = error.config;
//     const refresh = getRefreshToken();
//     if (error.response.status === 401 && !originalConfig._retry && refresh) {
//       originalConfig._retry = true;
//       const res = await axios.post(`${baseURL}/token/refresh/`, {
//         refresh,
//       });
//       if (res.status === 200) {
//         setAccessToken(res.data.access);
//         return myAxios(originalConfig);
//       } else {
//         removeTokens();
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await myAxios(`/${queryKey[0]}`);
  return data;
};

export default myAxios;
