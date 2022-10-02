import { Paper, Typography } from "@mui/material";
import React from "react";

const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        className="recharts-default-tooltip dark:bg-secondary-dark-bg dark:text-neutral"
        sx={{
          padding: 1,
          borderRadius: 1,
        }}
      >
        <Typography
          className="recharts-tooltip-label"
          color="primary"
          sx={{ fontWeight: 700 }}
        >
          {label}
        </Typography>
        {payload.map((item, index) => {
          return (
            <Typography
              key={index + "tooltip"}
              className="recharts-tooltip-item-name"
              fontSize={12}
            >
              {item?.name?.replace("_", " ")}:{" "}
              <Typography
                component="span"
                fontWeight={500}
                fontSize={13}
                color="primary"
              >
                {item?.value}
              </Typography>
            </Typography>
          );
        })}
      </Paper>
    );
  }
};

export default CustomChartTooltip;
