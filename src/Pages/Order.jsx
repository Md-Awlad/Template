import { Container, Modal } from "@mui/material";
import { useState } from "react";
import AddCategory from "../Components/Modals/AddCategory.jsx";
import OrderList from "../Components/Order/OrderList";
import PageTitle from "../Components/PageTitle/PageTitle";

const Order = () => {
  
  return (
    <Container>
      
      <PageTitle
        headingText="order list"
        pageName="order"
        
      />
      <OrderList />
    </Container>
  );
};

export default Order;
