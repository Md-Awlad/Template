import { Alert, Badge, Box, Typography } from "@mui/material";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import cookImg from "../../image/Cook.svg";
import { useStateContext } from "../../Contexts/ContextProvider";
import CustomDrawer from "../Shared/CustomDrawer";
import { Link } from "react-router-dom";

const PhoneHeader = () => {
  const { cart, activeMenu } = useStateContext();
  return (
    <Box className="bg-[#FFC446] px-5 py-3  flex justify-between items-center md:gap-0 gap-5 md:items-center fixed bottom-0 left-0 right-0 z-10 rounded-tr-xl rounded-tl-xl">
      <Box className="flex justify-between items-center w-48">
        <Link to="/">
          <AiOutlineHome className="inline w-10 h-10 text-neutral" />
        </Link>
        {activeMenu ? null : cart?.length ? (
          <CustomDrawer />
        ) : (
          <Badge
            className="cursor-pointer"
            badgeContent={cart.length}
            color="primary"
          >
            <MdOutlineAddShoppingCart className="inline w-10 h-10 text-neutral cursor-pointer" />
          </Badge>
        )}
      </Box>
      {activeMenu ? (
        <Alert severity="error">This is an error alert — check it out!</Alert>
      ) : (
        <Box className="absolute right-4 -top-6 w-20 h-20 rounded-full bg-neutral">
          <Box className="border-4 w-full h-full border-gray-200 rounded-full p-1">
            <img className="w-10 h-10 mx-auto " src={cookImg} alt="" />
            <Typography
              sx={{ fontSize: 10, fontWeight: 500, pl: 1, color: "#FFC446" }}
            >
              Order Now
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PhoneHeader;
