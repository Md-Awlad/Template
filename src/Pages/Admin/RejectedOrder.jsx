import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import RejectOrderList from "../../Components/Admin/RejectedFood/RejectOrderList";
import PageTitle from "../../Components/PageTitle/PageTitle";
import myAxios from "../../utils/myAxios";

const RejectedOrder = () => {
  const { data: cancelOrder = [] } = useQuery(["cancel"], async () => {
    const res = await myAxios("/cancel-orders/");
    return res.data;
  });
  console.log(cancelOrder);
  return (
    <Container>
      <PageTitle headingText="Rejected Order" pageName="Rejected" />
      <RejectOrderList cancelOrder={cancelOrder} />
    </Container>
  );
};

export default RejectedOrder;
