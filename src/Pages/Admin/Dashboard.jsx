import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import TodayOrder from "../../Components/Admin/Dashboard/TodayOrder";
import Total from "../../Components/Admin/Dashboard/Total";
import myAxios from "../../utils/myAxios";

const DashBoard = () => {
  const { data: todays = [], refetch: Refetch } = useQuery(
    ["today"],
    async () => {
      const res = await myAxios("/performance_count/");
      return res.data;
    }
  );
  console.log(todays);
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
        <Total todays={todays} />
        {/* <div className="grid lg:grid-cols-2 md:gap-10 gap-4">
          <div>
            <TodayOrder todays={todays} Refetch={Refetch} />
          </div>
          <div>
            <TotalSell />
          </div>
        </div> */}
      </div>
    </Container>
  );
};
export default DashBoard;
