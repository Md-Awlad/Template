import React from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import LandingPage from "./LandingPage";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { Box, Typography } from "@mui/material";
const Home = () => {
  const { restaurantData } = useStateContext();
  return (
    <div>
      {!Boolean(Object.entries(restaurantData).length) ? (
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
