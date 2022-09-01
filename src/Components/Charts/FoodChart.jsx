import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStateContext } from "../../Contexts/ContextProvider";

const data = [
  {
    name: "Burger",
    process: 400,
  },
  {
    name: "Pizza",
    process: 300,
  },
  {
    name: "Noodles",
    process: 350,
  },
  {
    name: "Chicken",
    process: 150,
  },
  {
    name: "Sandwich",
    process: 450,
  },
  {
    name: "Chicken Burger",
    process: 60,
  },
  {
    name: "abcd",
    process: 100,
  },
  {
    name: "hffghjg",
    process: 80,
  },
  {
    name: "lhjiui",
    process: 85,
  },
  {
    name: "hkjlg",
    process: 150,
  },
];

const FoodChart = () => {
  const { currentColor } = useStateContext();
  return (
    <div>
      <BarChart
        width={1000}
        height={350}
        data={data}
        margin={{
          top: 5,
          bottom: 5,
        }}
        barSize={40}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="process"
          fill={`${currentColor}`}
          background={{ fill: "#FFC446" }}
        />
      </BarChart>
    </div>
  );
};

export default FoodChart;
