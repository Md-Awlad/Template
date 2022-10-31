import { React } from "react";
import cookImg from "../../image/Cook.svg";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Cart from "../Frontend/Cart/Cart";
import { Typography } from "@mui/material";
import { useStateContext } from "../../Contexts/ContextProvider";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

const drawerWidth = 600;

const CustomDrawer = () => {
  const { cart } = useStateContext();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box
        onClick={handleDrawerOpen}
        className="md:w-28 md:h-28 w-20 h-20 border-8 border-neutral rounded-full md:-mt-20 -mt-8 bg-neutral flex items-center cursor-pointer hover:bg-gray-100"
      >
        {/* <Box
          className={`w-full h-full ${
            cart.length ? "border-1 border-red-500" : "border-1"
          } rounded-full md:p-2 p-1`}
        >
          <img
            className="md:w-14 md:h-16 w-10 h-10 mx-auto "
            src={cookImg}
            alt=""
          />
          <Typography
            sx={{
              fontSize: { sm: 14, xs: 8 },
              fontWeight: 500,
              pl: 0.9,
              color: "#F0A70B",
            }}
          >
            Order Now
          </Typography>
        </Box> */}
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
        <Cart />
      </Drawer>
    </Box>
  );
};

export default CustomDrawer;
