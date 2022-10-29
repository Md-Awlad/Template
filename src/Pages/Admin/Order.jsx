import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import OrderList from "../../Components/Admin/Order/OrderList";
import PageTitle from "../../Components/PageTitle/PageTitle";
import myAxios from "../../utils/myAxios";

const Order = () => {
  const {
    data: orders = [],
    refetch: orderRefetch,
    isLoading,
    isError,
  } = useQuery(["order"], async () => {
    const res = await myAxios("/order/");
    return res.data;
  });

  return (
    <Container>
      <PageTitle headingText="order" pageName="order" />
      <OrderList
        orders={orders}
        orderRefetch={orderRefetch}
        isLoading={isLoading}
        isError={isError}
      />
    </Container>
  );
};

export default Order;
