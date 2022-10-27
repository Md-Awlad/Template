// Set access token to localstorage
const setAccessToken = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
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
  return localStorage.setItem("colorInfo");
};

const getColorInfo = () => {
  return localStorage.getItem("colorInfo");
};

// Get access token from localstorage
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// Set refresh token to localstorage
const setRefreshToken = (refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken);
};

// Get refresh token from localstorage
const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

// Remove access token and refresh token from localstorage
const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
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
