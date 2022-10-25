import {
  Badge,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import logo from "../../image/logo.png";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import Cart from "./Cart/Cart";
import { IoMdCart } from "react-icons/io";
import CustomDrawer from "../Shared/CustomDrawer";

const Header = () => {
  const { cart, activeMenu } = useStateContext();

  return (
    <Box className="bg-[#E3493F] px-4 py-3 flex justify-between items-center md:gap-0 gap-5 md:items-center fixed top-0 left-0 right-0 z-10 lg:mb-6">
      <Link to="/">
        <img className="w-16 " src={logo} alt="" />
      </Link>
      {/* <Typography
        variant="h6"
        sx={{
          color: "#FFC446",
          letterSpacing: { md: "2rem", xs: "1rem" },
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        digital menu card
      </Typography> */}
      {activeMenu ? null : cart?.length ? (
        <CustomDrawer />
      ) : (
        <MdOutlineAddShoppingCart
          className="inline w-8 h-8 cursor-pointer"
          color="action"
        />
      )}
      {/* <button className="border md:w-24 w-40 p-1 rounded text-white">
        Order Info
      </button> 
      */}
    </Box>
  );
};

export default Header;
