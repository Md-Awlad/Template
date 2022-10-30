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
import mainLogo from "../../image/logo.png";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import Cart from "./Cart/Cart";
import { IoMdCart } from "react-icons/io";
import CustomDrawer from "../Shared/CustomDrawer";

const Header = () => {
  const { cart, activeMenu, restaurantData } = useStateContext();

  return (
    <>
      {restaurantData?.map((data, index) => (
        <Box
          key={index}
          style={{
            backgroundColor: data?.color || "#F0A70B",
          }}
          className=" px-4 py-2 flex justify-between items-center md:gap-0 gap-5 md:items-center fixed top-0 left-0 right-0 z-10 lg:mb-6"
        >
          <Link to="/">
            <img
              className="w-12 h-12 object-cover rounded-full"
              src={data?.logo || mainLogo}
              alt=""
            />
          </Link>

          {/* <Typography
      variant="h6"
      sx={{
        color: "#F0A70B",
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
        </Box>
      ))}
    </>
  );
};

export default Header;
