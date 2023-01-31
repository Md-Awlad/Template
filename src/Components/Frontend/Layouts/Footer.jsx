import { Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Typography
      component="span"
      variant="h6"
      sx={{
        fontSize: "16px",
        textAlign: "center",
        color: "#000",
      }}
    >
      <p className="text-sm mt-10">
        &#169; 2023 All rights reserved by{" "}
        <a
          rel="noreferrer"
          href="https://www.awlad.xyz/"
          target="_blank"
          className="text-blue-500 "
        >
          Awlad
        </a>
      </p>
    </Typography>
  );
};

export default Footer;
