import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CancelOrderList from "../../Components/Admin/CancelFood/CancelOrderList";
import PageTitle from "../../Components/PageTitle/PageTitle";
import myAxios from "../../utils/myAxios";

const CancelOrder = () => {
  const {
    data: cancelOrder = [],
    isLoading,
    isError,
  } = useQuery(["cancel"], async () => {
    const res = await myAxios("/cancel-orders/");
    return res.data;
  });
  return (
    <Container>
      <PageTitle headingText="Cancel Order" pageName="Cancel" />
      <CancelOrderList
        cancelOrder={cancelOrder}
        isLoading={isLoading}
        isError={isError}
      />
    </Container>
  );
};

export default CancelOrder;
