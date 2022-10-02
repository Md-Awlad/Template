import { Box } from "@mui/material";
import React from "react";
import Layout from "../../Components/Frontend/Layout/Layout";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #fff",
  borderRadius: "5px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 2,
};

const ConfirmedOrder = ({ confirmed }) => {
  console.log(confirmed);
  return (
    <Layout>
      <Box>confirmed order</Box>
    </Layout>
  );
};

export default ConfirmedOrder;
