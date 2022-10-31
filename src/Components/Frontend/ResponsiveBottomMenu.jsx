import { Badge, Box, Typography } from "@mui/material";
import React from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import cookImg from "../../image/Cook.svg";
import CustomDrawer from "../Shared/CustomDrawer";

const ResponsiveBottomMenu = () => {
  const { cart, activeMenu, restaurantData } = useStateContext();
  return (
    <>
      {restaurantData?.map((data) => (
        <Box
          style={{ backgroundColor: data?.color || "#F0A70B" }}
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
            {activeMenu ? null : cart?.length ? (
              <CustomDrawer />
            ) : (
              <Box className="md:w-28 md:h-28 w-20 h-20 border-8 border-neutral rounded-full md:-mt-20 -mt-8 bg-neutral flex items-center cursor-pointer hover:bg-gray-100">
                <Box
                  className={`w-full h-full ${
                    cart.length ? "border-1 border-red-400" : "border-1"
                  } rounded-full md:p-2 p-1  cursor-pointer `}
                >
                  <img
                    className="md:w-14 md:h-14 w-10 h-10  mx-auto   cursor-pointer"
                    src={cookImg}
                    alt=""
                  />
                  <Typography
                    sx={{
                      fontSize: { sm: 11, xs: 8 },
                      fontWeight: 500,
                      textAlign: "center",
                      color: "#F0A70B",
                    }}
                  >
                    Order Now
                  </Typography>
                </Box>
              </Box>
            )}

            <Link to="/">
              <AiOutlineHome className="inline md:w-20 md:h-20 w-8 h-8 text-neutral" />
            </Link>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default ResponsiveBottomMenu;