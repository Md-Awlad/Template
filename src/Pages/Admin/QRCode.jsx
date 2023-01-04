import { Box, Stack } from "@mui/material";
import React from "react";
import GenerateQR from "../../Components/Admin/QR/QrCodeGen";

function QRCodeGen() {
  return (
    <>
      <Box className=" w-full border-2  flex justify-center items-center h-screen space-x-20">
        <GenerateQR />
        {/* <GenerateQR /> */}
      </Box>
    </>
  );
}

export default QRCodeGen;
