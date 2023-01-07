import { Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Typography
      variant="h6"
      sx={{
        fontSize: "16px",
        textAlign: "center",
        color: "#000",
        py: 2,
      }}
    >
      <p>
        © 2022 All rights reserved by{" "}
        <a
          rel="noopener noreferrer"
          href="https://www.nexisltd.com/"
          target="_blank"
        >
          Nexis Ltd.
        </a>
      </p>
    </Typography>
  );
};

export default Footer;
