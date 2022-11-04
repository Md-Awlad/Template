import { Alert, AlertTitle, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoaderSource from "../../Components/Loaders/LoaderSource";
import PageTitle from "../../Components/PageTitle/PageTitle";
import CustomDataGrid from "../../Components/Shared/CustomDataGrid";
import myAxios from "../../utils/myAxios";

const SurveyList = () => {
  const columns = [
    {
      field: "order_id",
      headerName: "Order_ID",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "taste",
      headerName: "Taste",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "environment",
      headerName: "Environment",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cleanliness",
      headerName: "Cleanliness",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "service",
      headerName: "Service",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "singer",
      headerName: "Singer",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "overall",
      headerName: "Overall",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "review",
      headerName: "Review",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "source",
      headerName: "Source",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "first_visit",
      headerName: "Visit",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            className={`${
              params?.value === true
                ? "bg-green-200 text-green-900"
                : "bg-yellow-200 text-yellow-700"
            } px-5 rounded-md font-medium   `}
          >
            <p>{params?.value === true ? "true" : "false"}</p>
          </div>
        );
      },
    },
  ];

  const {
    data: surveyList = [],
    refetch: orderRefetch,
    isLoading,
    isError,
  } = useQuery(["surveyList"], async () => {
    const res = await myAxios("/survey/");
    return res.data;
  });

  return (
    <Container>
      <PageTitle headingText="Survey" pageName="Survey" />

      <div style={{ height: 510, width: "100%" }}>
        {isLoading ? (
          <LoaderSource />
        ) : isError ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Could not get Survey
          </Alert>
        ) : (
          <CustomDataGrid
            rows={surveyList}
            columns={columns}
            orderRefetch={orderRefetch}
          />
        )}
      </div>
    </Container>
  );
};

export default SurveyList;

/*
<DataGrid
  sx={{
    color: currentMode === "Dark" ? "#fff" : "#000",
    "& .MuiIconButton-root": {
      color: "unset !important",
    },
    "& .MuiTablePagination-toolbar": {
      color: currentMode === "Dark" ? "#fff" : "#000",
    },
    "& .MuiDataGrid-row:hover": {
      bgcolor: currentMode === "Dark" ? `${currentColor}10` : "",
    },
    "& .MuiDataGrid-selectedRowCount": {
      visibility: "hidden",
    },
    "& .MuiDataGrid-cell:focus-within": {
      outline: "none",
    },
    "& .MuiInput-root": {
      color: currentMode === "Dark" ? "#fff" : "#000",
    },
  }}
  rows={surveyList}
  columns={columns}
  orderRefetch={orderRefetch}
  rowsPerPageOptions={[5]}
  disableSelectionOnClick
  disableColumnFilter
  disableColumnSelector
  disableDensitySelector
  components={{ Toolbar: GridToolbar }}
  componentsProps={{
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
      printOptions: {
        disableToolbarButton: true,
      },
      csvOptions: {
        disableToolbarButton: true,
      },
    },
  }}
/>

*/
