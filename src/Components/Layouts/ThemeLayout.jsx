import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { useStateContext } from "../../Contexts/ContextProvider";

const ThemeLayout = ({ children }) => {
  const { currentColor } = useStateContext();
  const theme = createTheme({
    palette: {
      primary: {
        main: currentColor,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            color: "white",
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeLayout;
