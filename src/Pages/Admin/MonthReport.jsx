import { Container } from "@mui/material";
import React from "react";
import Report from "../../Components/Admin/Report/Report";
import PageTitle from "../../Components/PageTitle/PageTitle";

const MonthReport = () => {
  return (
    <Container>
      <PageTitle headingText="Report" pageName="Monthly Report" />
      <Report />
    </Container>
  );
};

export default MonthReport;
