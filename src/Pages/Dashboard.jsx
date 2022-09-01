import { Container } from "@mui/material";
import FoodChart from "../Components/Charts/FoodChart";
import ItemChart from "../Components/Charts/ItemChart";
import OrderChart from "../Components/Charts/OrderChart";

const DashBoard = () => {
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
        <div className="grid md:grid-cols-2 md:gap-16 gap-4">
          <div className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral text-center px-4 py-3 border rounded-md text-2xl font-semibold shadow-sm dark:border-gray-700">
            <h2>Total Item</h2>
            {/* <ItemChart /> */}
          </div>
          <div className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral text-center px-4 py-3 border rounded-md text-2xl font-semibold shadow-sm dark:border-gray-700">
            <h2>Total Order</h2>
            {/* <OrderChart /> */}
          </div>
        </div>
        <FoodChart />
      </div>
    </Container>
  );
};
export default DashBoard;
