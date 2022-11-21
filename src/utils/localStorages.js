// Set access token to localstorage
const setAccessToken = (accessToken) => {
  sessionStorage.setItem("accessToken", accessToken);
};
const setCurrentUser = (userinfo) => {
  sessionStorage.setItem("currentUser", userinfo);
};

const setOrderInfo = (orderInfo) => {
  localStorage.setItem("orderInfo", orderInfo);
};
const getOrderInfo = () => {
  return localStorage.getItem("orderInfo");
};
const setGmailInfo = (gmailInfo) => {
  localStorage.setItem("gmailInfo", gmailInfo);
};
const getGmailInfo = () => {
  return localStorage.getItem("gmailInfo");
};
const setPhoneInfo = (phoneInfo) => {
  localStorage.setItem("phoneInfo", phoneInfo);
};
const getPhoneInfo = () => {
  return localStorage.getItem("phoneInfo");
};

const setColorInfo = (colorInfo) => {
  localStorage.setItem("colorInfo");
};

const getColorInfo = () => {
  return localStorage.getItem("colorInfo");
};

// Get access token from localstorage
const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};
const getCurrentUser = () => {
  return sessionStorage.getItem("currentUser");
};

// Set refresh token to localstorage
const setRefreshToken = (refreshToken) => {
  sessionStorage.setItem("refreshToken", refreshToken);
};

// Get refresh token from localstorage
const getRefreshToken = () => {
  return sessionStorage.getItem("refreshToken");
};

// Remove access token and refresh token from localstorage
const removeTokens = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};

export {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  setCurrentUser,
  getCurrentUser,
  removeTokens,
  setOrderInfo,
  getOrderInfo,
  setGmailInfo,
  getGmailInfo,
  setPhoneInfo,
  getPhoneInfo,
  setColorInfo,
  getColorInfo,
};
