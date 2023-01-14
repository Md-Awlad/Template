import React from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import LandingPage from "./LandingPage";
import { Box, Typography } from "@mui/material";
import QueryLoader from "../../Components/Loaders/QueryLoader";
const Home = () => {
  const { restaurantData, restaurantIsLoading } = useStateContext();
  return (
    <div>
      {restaurantIsLoading ? (
        <Box className="h-screen flex justify-center items-center ">
          <QueryLoader />
        </Box>
      ) : Boolean(Object.entries(restaurantData).length) ? (
        <LandingPage />
      ) : (
        <div className="h-screen flex justify-center items-center ">
          <Box className="text-center">
            <Box className="flex justify-center">
              <img
                className="w-32 h-32 object-cover p-5"
                src="https://i.ibb.co/0q5B8VP/MainLogo.png"
                alt="nexis logo"
              />
            </Box>
            <Typography component="div" className="text-red-500">
              No Subscription Available
            </Typography>
            {/* <LocalDiningIcon sx={{ fontSize: 80 }} />
            <Typography component="span">Digital Menu</Typography> */}
          </Box>
        </div>
      )}
    </div>
  );
};

export default Home;
