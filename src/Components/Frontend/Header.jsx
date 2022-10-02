import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../image/logo.png";

const Header = () => {
  return (
    <Box className="bg-[#102750] px-4 py-1 flex md:justify-between md:gap-0 gap-1 items-center fixed top-0 left-0 right-0 z-10">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <Typography
        variant="h6"
        sx={{
          color: "#FFC446",
          letterSpacing: { md: "2rem", xs: "1rem" },
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        digital menu card
      </Typography>
      {/* <button className="border md:w-24 w-40 p-1 rounded text-white">
        Order Info
      </button> */}
    </Box>
  );
};

export default Header;
