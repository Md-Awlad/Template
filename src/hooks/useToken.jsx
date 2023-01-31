import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username: "mor_2314", password: "83r5^_" }),
    })
      .then((res) => res.json())
      .then((data) => {
        const accessToken = data.token;
        localStorage.setItem("accessToken", accessToken);
        setToken(token);
      });
  }, [token]);
  return [token];
};

export default useToken;
