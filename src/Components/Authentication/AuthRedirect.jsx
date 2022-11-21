import { useEffect } from "react";
import MainLoader from "../Loaders/MainLoader";

export const SSO_HOST =
  process.env.NODE_ENV === "production"
    ? "https://sso.ultimatehrm.xyz"
    : "http://localhost:3001";

const AuthRedirect = () => {
  useEffect(() => {
    const { host, protocol } = window.location;
    window.location.replace(
      `${SSO_HOST}/auth?redirect=${protocol + "//" + host}`
    );
  }, []);

  return <MainLoader />;
};

export default AuthRedirect;
