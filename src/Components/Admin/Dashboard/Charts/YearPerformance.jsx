import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStateContext } from "../../../../Contexts/ContextProvider";
import myAxios from "../../../../utils/myAxios";
import CustomChartTooltip from "../../../Shared/CustomChartTooltip";

const YearPerformance = () => {
  const { currentColor } = useStateContext();
  const [currentYear, setCurrentYear] = useState(moment());

  const { data: years = [] } = useQuery(["year"], async () => {
    const res = await myAxios(
      `/year_performance/${currentYear.format("YYYY")}/`
    );
    return res.data;
  });

  return (
    <>
      <Typography component="span" variant="h6">
        {" "}
        Yearly Report
      </Typography>
      {/* <Grid
        item
        xs={9}
        md={7}
        sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}
      >
        <DatePicker
          value={currentYear}
          views={["month", "year"]}
          //   inputFormat="MM/YYYY"
          onChange={(newValue) => setCurrentYear(newValue)}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      </Grid> */}
      <ResponsiveContainer width="99%" height={300}>
        <BarChart data={years}>
          <CartesianGrid strokeDasharray="3" opacity={0.5} />
          <XAxis dataKey="month" tick={{ fontSize: "12px" }} />
          <YAxis
            // label={{
            //   value: "Total Sell Performance",
            //   angle: -90,
            //   position: "insideLeft",
            // }}
            tick={{ fontSize: "14px" }}
            // interval={2}
          />
          <Tooltip content={<CustomChartTooltip />} />
          <Bar dataKey="total_order" stackId="a" fill="#F0A70B" barSize={35} />
          <Bar
            dataKey="complete_order"
            stackId="a"
            fill={currentColor}
            barSize={35}
          />
          <Bar
            dataKey="sell"
            stackId="a"
            fill={`${currentColor}90`}
            barSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default YearPerformance;
