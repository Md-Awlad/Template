import { Box, Stack } from "@mui/material";
import React from "react";
import GenerateQR from "../../Components/Admin/QR/QrCodeGen";

function QRCodeGen() {
  return (
    <Box className="space-y-3">
      {/* <Box className=" w-full border-2  flex justify-center items-center h-screen space-x-20">
      </Box> */}
      <GenerateQR />
    </Box>
  );
}

export default QRCodeGen;
