import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { getAccessToken } from "../utils/localStorages";
import myAxios, { staticAxios } from "../utils/myAxios";

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
  const [cart, setCart] = useState([]);
  const [checkbox, setCheckbox] = useState();
  const [ingredientId, setIngredientId] = useState();
  const [screenSize, setScreenSize] = useState(undefined);
  const [orderId, setOrderId] = useState();
  const [confirmed, setConfirmed] = useState();
  const [customColor, setCustomColor] = useState();
  const [accessToken, setAccessToken] = useState("");
  const [expandedMenu, setExpandedMenu] = useState(true);
  const [drawerToggle, setDrawerToggle] = useState(false);

  useEffect(() => {
    setAccessToken(getAccessToken());
  }, []);
  const { isLoading, data: currentUser = {} } = useQuery(
    ["currentUser"],
    async () => {
      if (getAccessToken() && sessionStorage.getItem("accessToken")) {
        const res = await myAxios("/user_info/");
        return res?.data;
      } else {
        return [];
      }
    },
    {
      // enabled: Boolean(accessToken) || Boolean(refreshToken),
      refetchOnWindowFocus: false,
      cacheTime: 0,
      retry: false,
      keepPreviousData: false,
    }
  );
  const {
    data: restaurantData = {},
    isLoading: restaurantIsLoading,
    isError: restaurantIsError,
    refetch,
  } = useQuery(["restaurantData"], async () => {
    const res = await staticAxios("/restaurant/");
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
  /* Setting the screen size and then setting the active menu to false if the screen size is less than
900. */

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

  return (
    <StateContext.Provider
      value={{
        //states
        currentUser,
        restaurantIsLoading,
        restaurantIsError,
        restaurantData,
        confirmed,
        currentColor,
        orderId,
        currentMode,
        screenSize,
        accessToken,
        initialState,
        customColor,
        checkbox,
        themeSettings,
        ingredientId,
        cart,
        isLoading,
        expandedMenu,
        drawerToggle,
        //actions
        setDrawerToggle,
        refetch,
        setExpandedMenu,
        setConfirmed,
        setCustomColor,
        setOrderId,
        setCurrentMode,
        setScreenSize,
        setCurrentColor,
        setMode,
        setColor,
        setThemeSettings,
        setCart,
        setCheckbox,
        setIngredientId,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
