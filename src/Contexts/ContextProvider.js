import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

const initialState = {
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [expandedMenu, setExpandedMenu] = useState(true);
  const [drawerToggle, setDrawerToggle] = useState(false);

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
        screenSize,
        initialState,
        expandedMenu,
        drawerToggle,
        setDrawerToggle,
        setExpandedMenu,
        setScreenSize,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
