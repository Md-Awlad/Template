import { Box } from "@mui/material";
import React from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";
import Footer from "../Footer";
import Header from "../Header";
import PhoneHeader from "../PhoneHeader";

const Layout = ({ children }) => {
  const { activeMenu } = useStateContext();
  return (
    <Box>
      {activeMenu ? <Header /> : null}
      <main>{children}</main>
      {activeMenu ? <Footer /> : <PhoneHeader />}
    </Box>
  );
};

export default Layout;
