import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useStateContext } from "../../Contexts/ContextProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const { currentColor } = useStateContext();

  const data = {
    labels: ["Available SMS", "Total Sent"],
    datasets: [
      {
        label: "# of Votes",
        data: [19, 12],
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          `${currentColor}`,
          `${currentColor}90`,
          //   "#004770",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          `${currentColor}`,
          `${currentColor}90`,
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
