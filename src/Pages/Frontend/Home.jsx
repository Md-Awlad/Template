import React from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import LandingPage from "./LandingPage";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { Box, Typography } from "@mui/material";
const Home = () => {
  const { restaurantData } = useStateContext();
  return (
    <div>
      {Boolean(Object.entries(restaurantData).length) ? (
        <LandingPage />
      ) : (
        <div className="h-screen flex justify-center items-center ">
          <Box className="text-center">
            <LocalDiningIcon sx={{ fontSize: 80 }} />
            <Typography>Digital Menu</Typography>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Home;
