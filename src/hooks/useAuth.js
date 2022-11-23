/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setTokens,
} from "../utils/localStorages";
import { staticAxios } from "../utils/myAxios";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    staticAxios
      .post("/token/verify/", {
        token: getAccessToken(),
      })
      .then((res) => {
        setLoggedIn(true);
        setLoading(false);
      })
      .catch((err) => {
        staticAxios
          .post("/token/refresh/", {
            refresh: getRefreshToken(),
          })
          .then((res) => {
            const { access, refresh } = res?.data;
            setTokens(access, refresh);
            setLoggedIn(true);
            setLoading(false);
          })
          .catch((err) => {
            removeTokens();
            setLoggedIn(false);
            setLoading(false);
          });
      });
  }, []);

  return { loggedIn, loading };
};

export default useAuth;
