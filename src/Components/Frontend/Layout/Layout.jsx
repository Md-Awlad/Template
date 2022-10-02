import { Box } from "@mui/material";
import React from "react";
import Footer from "../Footer";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <main>{children}</main>
      <Footer />
    </Box>
  );
};

export default Layout;
