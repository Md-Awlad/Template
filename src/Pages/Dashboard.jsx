import { Container } from "@mui/material";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import AvailablePackage from "../Components/Dashboard/Card/AvailablePackage";
import AvailableSMS from "../Components/Dashboard/Card/AvailableSMS";
import Campaign from "../Components/Dashboard/Card/Campaign";
import Last from "../Components/Dashboard/Card/Last";
import Chart from "../Components/Dashboard/Chart";

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
    </Container>
  );
};
export default DashBoard;
