import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useStateContext } from "../../../../Contexts/ContextProvider";
import myAxios from "../../../../utils/myAxios";

const month = [
  {
    label: "Jan",
    value: "01",
  },
  {
    label: "Feb",
    value: "02",
  },
  {
    label: "Mar",
    value: "03",
  },
  {
    label: "Apr",
    value: "04",
  },
  {
    label: "May",
    value: "05",
  },
  {
    label: "June",
    value: "06",
  },
  {
    label: "July",
    value: "07",
  },
  {
    label: "Aug",
    value: "08",
  },
  {
    label: "Sep",
    value: "09",
  },
  {
    label: "Oct",
    value: "10",
  },
  {
    label: "Nov",
    value: "11",
  },
  {
    label: "Dec",
    value: "12",
  },
];
const MonthlySell = () => {
  const { currentColor, restaurantData } = useStateContext();
  const [currentMonth, setCurrentMonth] = useState(moment().format("MM"));

  const handleChange = (event) => {
    setCurrentMonth(event.target.value);
  };

  const { data: months = [] } = useQuery(["month", currentMonth], async () => {
    const res = await myAxios(`/month_performance/${currentMonth}/`);
    return res.data;
  });

  const data = {
    labels: [],
    datasets: [
      {
        data: [months.order, months.complete_order],
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
        height: { md: "55vh" },

        // boxShadow: "0 0 3px 3px #eee",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="span" variant="h6">
          Monthly Report
        </Typography>
        <FormControl sx={{ width: 120 }}>
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            MenuProps={{
              PaperProps: { sx: { maxHeight: 200, maxWidth: 120 } },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentMonth}
            label="Month"
            size="small"
            onChange={handleChange}
          >
            {month?.map((data, index) => (
              <MenuItem key={index} value={data.value}>
                {data.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: 150, height: 150, margin: "auto" }}>
        <Doughnut data={data} />
      </Box>
      <Box sx={{ marginY: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{ width: 12, height: 12, marginTop: 0.5 }}
            style={{ backgroundColor: `${currentColor}90` }}
          ></Box>
          <Box>
            <Typography component="span" variant="h6" sx={{ fontSize: "14px" }}>
              Order
              <span className="text-lg font-semibold pl-3">{months.order}</span>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            style={{ backgroundColor: currentColor }}
            sx={{ width: 12, height: 12, marginTop: 0.5 }}
          ></Box>
          <Box>
            <Typography component="span" variant="h6" sx={{ fontSize: "14px" }}>
              Complete Order
              <span className="text-lg font-semibold pl-3">
                {months.complete_order}
              </span>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              backgroundColor: restaurantData?.color || "#F0A70B",
              width: 12,
              height: 12,
              marginTop: 0.5,
            }}
          ></Box>

          <Box>
            <Typography component="span" variant="h6" sx={{ fontSize: "14px" }}>
              Total Amount
              <span className="text-lg font-semibold pl-3">{months.sell}</span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MonthlySell;
