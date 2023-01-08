import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import PropTypes from "prop-types";
import React from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";
import MonthlySell from "./Charts/MonthlySell";
import TodaySell from "./Charts/TodaySell";
import YearPerformance from "./Charts/YearPerformance";
ChartJS.register(ArcElement, Tooltip, Legend);

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          component="span"
          variant="body2"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
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
      <Typography component="span" variant="h5" sx={{ fontWeight: 500 }}>
        Orders Summary
      </Typography>

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
