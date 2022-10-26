import axios from "axios";

const interceptor = axios.create({
  baseURL: "https://api.nexismenu.live",
  // baseURL: "http://10.27.27.32:8001",
  // baseURL: "https://api.neuvemirestro.com",
});

// Add a request interceptor
interceptor.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
interceptor.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default interceptor;
