import { Box, Typography } from "@mui/material";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useStateContext } from "../../../../Contexts/ContextProvider";

const TodaySell = ({ orders }) => {
  const { currentColor } = useStateContext();

  const data = {
    labels: [],
    datasets: [
      {
        data: [orders.today_order, orders.today_order_complete],
        backgroundColor: [`${currentColor}90`, `${currentColor}`],
        borderColor: [`${currentColor}90`, `${currentColor}`],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: "0 0 3px 3px #eee",
        // height: { md: "61.5vh" },
      }}
    >
      <Typography variant="h6">Today Report</Typography>
      <Box sx={{ width: 150, height: 150, margin: "auto", mt: 1 }}>
        <Doughnut data={data} />
      </Box>
      <Box sx={{ marginY: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{ width: 12, height: 12, marginTop: 0.5 }}
            style={{ backgroundColor: `${currentColor}90` }}
          ></Box>
          <Box>
            <Typography variant="h6" sx={{ fontSize: "14px" }}>
              Order
              <span className="text-lg font-semibold pl-3">
                {orders.today_order}
              </span>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            style={{ backgroundColor: currentColor }}
            sx={{ width: 12, height: 12, marginTop: 0.5 }}
          ></Box>
          <Box>
            <Typography variant="h6" sx={{ fontSize: "14px" }}>
              Complete Order
              <span className="text-lg font-semibold pl-3">
                {orders.today_order_complete}
              </span>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              backgroundColor: "#FFC446",
              width: 12,
              height: 12,
              marginTop: 0.5,
            }}
          ></Box>
          <Box>
            <Typography variant="h6" sx={{ fontSize: "14px" }}>
              Total Amount
              <span className="text-lg font-semibold pl-3">
                {orders.today_sell}
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TodaySell;
