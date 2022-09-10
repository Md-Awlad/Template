import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CompleteOrderList from "../../Components/Admin/CompleteOrder/CompleteOrderList";
import PageTitle from "../../Components/PageTitle/PageTitle";
import myAxios from "../../utils/myAxios";

const CompleteOrder = () => {
  const { data: completes = [] } = useQuery(["complete"], async () => {
    const res = await myAxios("/complete-orders/");
    return res.data;
  });
  console.log(completes);
  return (
    <Container>
      <PageTitle headingText="Complete Order" pageName="Completed" />
      <CompleteOrderList completes={completes} />
    </Container>
  );
};

export default CompleteOrder;
