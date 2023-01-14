import { Dashboard } from "@mui/icons-material";
import { Badge, Box, Drawer, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import { getAccessToken } from "../../utils/localStorages";
import SvgImage from "../Loaders/SvgImage";
import Cart from "./Cart/Cart";

const ResponsiveBottomMenu = () => {
  const {
    cart,
    restaurantData,
    currentUser: { id: U_ID = null },
  } = useStateContext();
  const [isFromCart, setIsFromCart] = useState(false);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = (bool) => {
    setIsFromCart(bool);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: restaurantData?.color || "#F0A70B",
          "@media print": {
            display: "none",
          },
        }}
        className="px-10 md:py-6 py-3  flex justify-between items-center md:gap-0 gap-5 md:items-center fixed bottom-0 left-0 right-0 z-10 rounded-tr-xl rounded-tl-xl"
      >
        <Box className="flex justify-between items-center w-full">
          <Badge
            onClick={() => handleDrawerOpen(true)}
            className="mt-1"
            badgeContent={cart.length}
            color="primary"
          >
            <AiOutlineShoppingCart className="inline md:w-16 md:h-16 w-8 h-8 text-neutral " />
          </Badge>

          <Box
            onClick={() => handleDrawerOpen(false)}
            className={`md:w-28 md:h-28 w-20 h-20 border-8 border-neutral rounded-full md:-mt-20 -mt-8 bg-neutral flex items-center 
              "
               hover:bg-gray-100 `}
          >
            <Box
              className={`w-full h-full ${
                cart.length ? "border-1 border-red-400" : "border-1"
              } rounded-full md:p-2 p-1  cursor-pointer `}
            >
              <SvgImage />
              <Typography
                sx={{
                  fontSize: { sm: 11, xs: 8 },
                  fontWeight: 500,
                  textAlign: "center",
                  color: restaurantData?.color || "#F0A70B",
                }}
              >
                Order Now
              </Typography>
            </Box>
          </Box>

          {Boolean(U_ID) || Boolean(getAccessToken()) ? (
            <Link to="/dashboard">
              <Dashboard className="inline md:w-16 md:h-16 w-8 h-8 text-neutral " />
            </Link>
          ) : (
            <AiOutlineHome className="inline md:w-16 md:h-16 w-8 h-8 text-neutral " />
          )}
        </Box>
      </Box>
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 1,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Box className="flex justify-start mx-3 my-4">
          <IoIosArrowForward
            className="inline w-6 h-6 cursor-pointer"
            onClick={handleDrawerClose}
          />
        </Box>
        <Cart isFromCart={isFromCart} />
      </Drawer>
    </>
  );
};

export default ResponsiveBottomMenu;
