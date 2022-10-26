import { Box } from "@mui/material";
import React from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";
import BGIcon from "../../../image/restaurant_icons.webp";
import Footer from "../Footer";
import Header from "../Header";
import PhoneHeader from "../PhoneHeader";
const Layout = ({ children }) => {
  const { activeMenu } = useStateContext();
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${BGIcon})`,

          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          // // height: "100vh",
          // backgroundPosition: "center",
          // backgroundColor: "rgba(0, 0, 0, 0.9)",
        }}
      >
        {activeMenu ? <Header /> : null}
        <main
          style={{
            maskImage: " linear-gradient(black, transparent)",
          }}
        >
          {children}
        </main>
        {activeMenu ? <Footer /> : <PhoneHeader />}
      </Box>
    </>
  );
};

export default Layout;
