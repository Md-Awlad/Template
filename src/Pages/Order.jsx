import { Container } from "@mui/material";
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
