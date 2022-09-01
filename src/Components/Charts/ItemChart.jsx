import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useStateContext } from "../../Contexts/ContextProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

const ItemChart = () => {
  const { currentColor } = useStateContext();

  const data = {
    datasets: [
      {
        data: [100, 70],
        backgroundColor: ["#FFC446", `${currentColor}`],
        borderColor: ["#FFC446", `${currentColor}`],
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

export default ItemChart;
