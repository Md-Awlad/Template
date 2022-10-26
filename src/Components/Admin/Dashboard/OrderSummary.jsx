import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";
import PropTypes from "prop-types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import TodaySell from "./Charts/TodaySell";
import MonthlySell from "./Charts/MonthlySell";
import YearPerformance from "./Charts/YearPerformance";
import ProgressBar from "@ramonak/react-progress-bar";
ChartJS.register(ArcElement, Tooltip, Legend);

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const OrderSummary = ({ orders }) => {
  const { currentColor } = useStateContext();
  // const testData = [{ bgcolor: "#6a1b9a", completed: 60 }];

  return (
    <Box className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral md:px-10 px-4 py-4 border rounded-md text-2xl font-semibold shadow-sm dark:border-gray-700 space-y-8">
      <Typography variant="h5" sx={{ fontWeight: 500 }}>
        Orders Summary
      </Typography>
      {/* <Box
        style={{ backgroundColor: `${currentColor}20` }}
        sx={{
          padding: 2,
          borderRadius: 2,
          boxShadow: "0px 0px 3px 3px #eee",
          border: "1px solid #ccc",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "16px", fontWeight: 500, paddingY: 1 }}
        >
          Today Selling Performance
        </Typography>
        <LinearProgressWithLabel value={orders.percentage} />
        <ProgressBar style={{ height: "1rem" }} completed={orders.today_sell} />
        <Typography
          variant="h6"
          sx={{ fontSize: "16px", fontWeight: 500, paddingY: 1 }}
        >
          Yesterday Selling Performance
        </Typography>
        <LinearProgressWithLabel value={orders.percentage} />
        <ProgressBar
          style={{ height: "1rem" }}
          completed={orders.yesterday_sell}
        />
      </Box> */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { lg: "repeat(2,1fr)" },
          gap: 2,
        }}
      >
        {/* --leftTodayOrder-- */}
        <Box>
          <TodaySell orders={orders} />
        </Box>
        {/* --rightYesterdayOrder-- */}
        <Box>
          <MonthlySell />
        </Box>
      </Box>
      <hr />
      <YearPerformance />
    </Box>
  );
};

export default OrderSummary;
