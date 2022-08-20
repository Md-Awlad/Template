/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import interceptor from "../../utils/interceptor";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setTokens,
} from "../utils/localStorages";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    interceptor
      .post("/token/verify/", {
        token: getAccessToken(),
      })
      .then((res) => {
        setLoggedIn(true);
        setLoading(false);
      })
      .catch((err) => {
        interceptor
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
