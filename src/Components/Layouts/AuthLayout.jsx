import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box
      className="min-h-screen bg-gray-100"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
