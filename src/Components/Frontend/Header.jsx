import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import mainLogo from "../../image/logo.png";

const Header = () => {
  const { expandedMenu, restaurantData } = useStateContext();
  return (
    <>
      <Box
        style={{
          backgroundColor: restaurantData?.color || "#F0A70B",
        }}
        className=" px-4 py-2 flex justify-between items-center  md:items-center"
      >
        <Link to="/">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src={restaurantData?.logo || mainLogo}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "https://i.ibb.co/0q5B8VP/MainLogo.png";
            }}
            alt=""
          />
        </Link>
        {Boolean(sessionStorage.getItem("accessToken")) && (
          <Link to="dashboard">
            {expandedMenu && (
              <Button
                sx={{
                  color: "#fff",
                }}
                variant="contained"
              >
                go to dashboard
              </Button>
            )}
          </Link>
        )}
      </Box>
    </>
  );
};

export default Header;
