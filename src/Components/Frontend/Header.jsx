import { Dashboard } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import mainLogo from "../../image/logo.png";
import CustomDrawer from "../Shared/CustomDrawer";

const Header = () => {
  const {
    cart,
    expandedMenu,
    restaurantData,
    currentUser: { id: UID = null },
  } = useStateContext();

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
        {Boolean(UID) && (
          <Link to="dashboard">
            {expandedMenu ? (
              <Button
                sx={{
                  color: "#fff",
                }}
                variant="contained"
              >
                go to dashboard
              </Button>
            ) : (
              <Dashboard />
            )}
          </Link>
        )}
        {expandedMenu ? null : cart?.length ? (
          <CustomDrawer />
        ) : (
          <MdOutlineAddShoppingCart
            className="inline w-8 h-8 cursor-pointer"
            color="action"
          />
        )}
      </Box>
    </>
  );
};

export default Header;
