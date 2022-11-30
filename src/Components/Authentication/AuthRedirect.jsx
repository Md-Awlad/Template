import { useEffect } from "react";
import MainLoader from "../Loaders/MainLoader";

export const SSO_HOST =
  process.env.NODE_ENV === "production"
    ? "https://nexis.com.bd"
    : // : "https://nexis.com.bd";
      "http://localhost:3001";

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
