import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
// import { Cell, Pie, PieChart } from "recharts";
import { useStateContext } from "../../../Contexts/ContextProvider";

// const COLORS = ["#0088FE", "#00C49F"];
ChartJS.register(ArcElement, Tooltip, Legend);

const TodayOrder = ({ todays }) => {
  const { currentColor } = useStateContext();

  //   const data = [
  //     { name: "Group A", value: 400 },
  //     { name: "Group B", value: 300 },
  //   ];

  const data = {
    labels: [],
    datasets: [
      {
        data: [todays.today_order, todays.yesterday_order],
        backgroundColor: [`${currentColor}`, `${currentColor}90`],
        borderColor: [`${currentColor}`, `${currentColor}90`],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral px-10 py-4 border rounded-md text-2xl font-semibold shadow-sm dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h2>Orders</h2>
        <div>
          <h2 className="text-xs">
            Total Order
            <span className="text-lg font-bold pl-3">{todays.total_order}</span>
          </h2>
        </div>
      </div>
      <div className="flex md:justify-between items-center flex-wrap justify-center">
        <div className="w-36 h-36">
          <Doughnut data={data} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: currentColor }}
              className="w-3 h-3 mt-1"
            ></div>
            <div>
              <h2 className="text-xs">
                Today Order
                <span className="text-lg font-bold pl-3">
                  {todays.today_order}
                </span>
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: `${currentColor}90` }}
              className="w-3 h-3 mt-1"
            ></div>
            <div>
              <h2 className="text-xs">
                Yesterday Order
                <span className="text-lg font-bold pl-3">
                  {todays.yesterday_order}
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayOrder;
