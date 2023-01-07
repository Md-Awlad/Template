import { Dashboard } from "@mui/icons-material";
import { Badge, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import { getAccessToken } from "../../utils/localStorages";
import SvgImage from "../Loaders/SvgImage";
import CustomDrawer from "../Shared/CustomDrawer";

const ResponsiveBottomMenu = () => {
  const {
    cart,
    expandedMenu,
    restaurantData,
    currentUser: { id: U_ID = null },
  } = useStateContext();
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    setAccessToken(getAccessToken());
  }, []);
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
            className="lg:cursor-pointer"
            badgeContent={cart.length}
            color="primary"
          >
            <AiOutlineShoppingCart className="inline md:w-16 md:h-16 w-8 h-8 text-neutral " />
          </Badge>
          {expandedMenu ? null : cart?.length ? (
            <CustomDrawer />
          ) : (
            <Box
              className={`md:w-28 md:h-28 w-20 h-20 border-8 border-neutral rounded-full md:-mt-20 -mt-8 bg-neutral flex items-center ${
                !expandedMenu && "cursor-pointer"
              } hover:bg-gray-100`}
            >
              <Box
                className={`w-full h-full ${
                  cart.length ? "border-1 border-red-400" : "border-1"
                } rounded-full  p-1   `}
              >
                <SvgImage />
                <Typography
                  sx={{
                    fontSize: { sm: 11, xs: 8 },
                    fontWeight: 500,
                    textAlign: "center",
                    color: restaurantData?.map(
                      (data) => data?.color || "#F0A70B"
                    ),
                  }}
                >
                  Order Now
                </Typography>
              </Box>
            </Box>
          )}

          {Boolean(U_ID) || Boolean(accessToken) ? (
            <Link to="/dashboard">
              <Dashboard className=" text-neutral " />
            </Link>
          ) : (
            <Link to="/">
              <AiOutlineHome className=" text-neutral text-3xl" />
            </Link>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ResponsiveBottomMenu;
