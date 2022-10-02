import { Badge, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import OrderList from "../../Components/Admin/Order/OrderList";
import PageTitle from "../../Components/PageTitle/PageTitle";
import myAxios from "../../utils/myAxios";

const Order = () => {
  const { data: orders = [], refetch: orderRefetch } = useQuery(
    ["order"],
    async () => {
      const res = await myAxios("/order/");
      return res.data;
    }
  );
  console.log(orders?.map((a) => a.length));

  return (
    <Container>
      <PageTitle headingText="order" pageName="order" />
      <OrderList orders={orders} orderRefetch={orderRefetch} />
    </Container>
  );
};

export default Order;
