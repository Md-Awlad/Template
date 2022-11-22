import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
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
  // const [currentUser, setCurrentUserData] = useState({});
  // const { pathname } = useLocation();

  // if (pathname === "dashboard") {
  //   console.log(pathname);
  //   const userInfo = async () => {
  //     const res = await myAxios("/user_info/");
  //     // sessionStorage.setItem("currentUser", res?.data);
  //     setCurrentUserData(res?.data);
  //     setCurrentUser(res?.data);
  //     // return res?.data;
  //   };
  // }
  const { isLoading, data: currentUser = {} } = useQuery(
    ["currentUser"],
    async () => {
      const res =  myAxios("/user_info/");
      return res?.data;
    },
    {
      // enabled: Object.entries(getAccessToken()).length ? true : false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      retry: false,
      keepPreviousData: false,
    }
  );
  const {
    data: restaurantData = [],
    isLoading: restaurantIsLoading,
    isError: restaurantIsError,
    refetch,
  } = useQuery(["restaurantData"], async () => {
    const res = await staticAxios("/restaurant/");
    return res.data;
  });

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
        restaurantIsLoading,
        restaurantIsError,
        restaurantData,
        refetch,

        currentPass,
        // isLoading,
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
        isLoading,
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
