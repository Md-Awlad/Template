import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import myAxios from "../utils/myAxios";

const StateContext = createContext();

const initialState = {
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState(
    localStorage.getItem("colorMode") || "#5442A8"
  );
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem("themeMode") || "Light"
  );
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [currentPass, setCurrentPass] = useState(null);
  const [cart, setCart] = useState([]);
  const [checkbox, setCheckbox] = useState();
  const [ingredientId, setIngredientId] = useState();
  const [screenSize, setScreenSize] = useState(undefined);
  const [expandedMenu, setExpandedMenu] = useState(true);
  const [orderId, setOrderId] = useState();
  const [confirmed, setConfirmed] = useState();
  const [customColor, setCustomColor] = useState();

  const { isLoading, data: currentUser = {} } = useQuery(
    ["currentUser"],
    async () => {
      const res = await myAxios("/user_info");
      return res?.data;
    }
  );

  // const { data: create_menu = {} } = useQuery(["create_menu"], async () => {
  //   const res = await myAxios("/create_menu");
  //   return res?.data;
  // });

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
      setExpandedMenu(false);
    } else {
      setExpandedMenu(true);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

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
        isLoading,
        confirmed,
        setConfirmed,
        expandedMenu,
        currentColor,
        orderId,
        customColor,
        setCustomColor,
        setOrderId,
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
        cart,
        setCart,
        checkbox,
        setCheckbox,
        ingredientId,
        setIngredientId,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
