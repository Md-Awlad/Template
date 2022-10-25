import { Alert, Badge, Box, Typography } from "@mui/material";
import React from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import cookImg from "../../image/Cook.svg";
import { useStateContext } from "../../Contexts/ContextProvider";
import CustomDrawer from "../Shared/CustomDrawer";
import { Link } from "react-router-dom";

const PhoneHeader = () => {
  const { cart, activeMenu } = useStateContext();
  return (
    <Box className="bg-[#F0A70B] px-10 md:py-6 py-3  flex justify-between items-center md:gap-0 gap-5 md:items-center fixed bottom-0 left-0 right-0 z-10 rounded-tr-xl rounded-tl-xl">
      <Box className="flex justify-between items-center w-full">
        <Link to="/carts">
          <Badge
            className="cursor-pointer"
            badgeContent={cart.length}
            color="primary"
          >
            <AiOutlineShoppingCart className="inline md:w-20 md:h-20 w-10 h-10 text-neutral cursor-pointer" />
          </Badge>
        </Link>
        {activeMenu ? null : cart?.length ? (
          <CustomDrawer />
        ) : (
          <Box className="md:w-32 md:h-32 w-24 h-24 rounded-full md:-mt-16 -mt-10 bg-neutral">
            <Box className="border-4 w-full h-full border-gray-200 rounded-full md:p-2 p-1">
              <img
                className="md:w-20 md:h-20 w-14 h-14 mx-auto "
                style={{ color: "blue" }}
                src={cookImg}
                alt=""
              />
              <Typography
                sx={{
                  fontSize: { sm: 16, xs: 13 },
                  fontWeight: 500,
                  pl: 1,
                  color: "#F0A70B",
                }}
              >
                Order Now
              </Typography>
            </Box>
          </Box>
        )}

        <Link to="/">
          <AiOutlineHome className="inline md:w-20 md:h-20 w-10 h-10 text-neutral" />
        </Link>
      </Box>
    </Box>
  );
};

export default PhoneHeader;
