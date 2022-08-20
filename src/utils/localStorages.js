// Set access token to localstorage
const setAccessToken = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
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
};
