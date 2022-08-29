import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import myAxios from "../utils/myAxios";

const StateContext = createContext();

const initialState = {
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState(
    localStorage.getItem("colorMode") || "#5442A8"
  );
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem("themeMode") || "Light"
  );
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [currentPass, setCurrentPass] = useState(null);

  const {
    isLoading,
    data: currentUser = {},
    refetch: currentUserRefetch,
  } = useQuery(["currentUser"], async () => {
    const res = await myAxios("/user_info");
    return res?.data;
  });

  const setMode = (value) => {
    setCurrentMode(value);
    localStorage.setItem("themeMode", value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  return (
    <StateContext.Provider
      value={{
        currentUser,
        currentPass,
        // setCurrentUser,
        isLoading,
        currentColor,
        currentMode,
        setCurrentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        initialState,
        setActiveMenu,
        setCurrentColor,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
