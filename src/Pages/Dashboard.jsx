import { Container } from "@mui/material";
import LineChart from "../Components/Charts/Chart";

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
      <LineChart />
    </Container>
  );
};
export default DashBoard;
