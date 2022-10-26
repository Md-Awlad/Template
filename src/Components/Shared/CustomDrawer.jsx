import { React } from "react";
import cookImg from "../../image/Cook.svg";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Cart from "../Frontend/Cart/Cart";
import { Badge, Typography } from "@mui/material";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useStateContext } from "../../Contexts/ContextProvider";
import { IoIosArrowForward } from "react-icons/io";

const CustomDrawer = () => {
  const { cart } = useStateContext();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      {/* <Badge
        className="cursor-pointer"
        badgeContent={cart.length}
        color="primary"
      >
        <MdOutlineAddShoppingCart
          onClick={handleDrawerOpen}
          className="inline md:w-20 md:h-20 w-10 h-10 text-neutral cursor-pointer"
          color="action"
        />
      </Badge> */}
      <Box
        onClick={handleDrawerOpen}
        className="md:w-28 md:h-28 w-20 h-20 border-8 border-neutral rounded-full md:-mt-14 -mt-8 bg-neutral"
      >
        <Box
          className={`w-full h-full ${
            cart.length ? "border-1 border-red-500" : "border-1"
          } rounded-full md:p-2 p-1`}
        >
          <img
            className="md:w-16 md:h-16 w-10 h-10 mx-auto "
            style={{ color: "blue" }}
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
        </Box>
      </Box>

      <Drawer variant="persistent" anchor="right" open={open}>
        <Box className="flex justify-start mx-3 md:my-2 my-4">
          <IoIosArrowForward
            className="inline w-6 h-6"
            onClick={handleDrawerClose}
          />
        </Box>
        <Cart />
      </Drawer>
    </Box>
  );
};

export default CustomDrawer;
