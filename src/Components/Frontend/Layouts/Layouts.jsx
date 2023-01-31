import { Box } from "@mui/material";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
const Layouts = ({ children }) => {
  return (
    <Box>
      <Header />
      <main className="mt-16 mx-10">{children}</main>
      <Footer />
    </Box>
  );
};

export default Layouts;
