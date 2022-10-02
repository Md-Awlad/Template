import { Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Typography
      variant="h6"
      sx={{ fontSize: "16px", textAlign: "center", color: "#000", marginY: 3 }}
    >
      <p>© 2022 All rights reserved by Nexis Ltd.</p>
    </Typography>
  );
};

export default Footer;
