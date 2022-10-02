import { Box } from "@mui/material";
import React from "react";
import Report from "../../Components/Admin/Report/Report";
import PageTitle from "../../Components/PageTitle/PageTitle";

const MonthReport = () => {
 
  return (
    <Box>
      <PageTitle headingText="Report" pageName="Report" />
      <Box>
        <Report />
      </Box>
    </Box>
  );
};

export default MonthReport;
