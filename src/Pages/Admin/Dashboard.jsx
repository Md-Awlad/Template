import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import MonthlySell from "../../Components/Admin/Dashboard/Charts/MonthlySell";
import OrderSummary from "../../Components/Admin/Dashboard/OrderSummary";
import Total from "../../Components/Admin/Dashboard/Total";
import myAxios from "../../utils/myAxios";

const DashBoard = () => {
  const { data: orders = [], refetch: Refetch } = useQuery(
    ["today"],
    async () => {
      const res = await myAxios("/performance_count/");
      return res.data;
    }
  );
  return (
    <Container>
      <div className="md:flex justify-between mb-5 py-2  items-center">
        <div className="dark:text-neutral">
          <h2 className="text-3xl  font-semibold capitalize">
            Welclome <span className="text-gray-600 dark:text-gray-400">!</span>
          </h2>
          <p className="text-sm my-2 font-medium capitalize">Dashboard</p>
        </div>
      </div>
      <div className="space-y-10">
        <Total orders={orders} Refetch={Refetch} />
        <OrderSummary orders={orders} Refetch={Refetch} />
      </div>
    </Container>
  );
};
export default DashBoard;
