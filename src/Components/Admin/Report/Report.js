import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

const Report = () => {
  const { currentColor, currentMode } = useStateContext();
  const [date, setDate] = useState(moment());
  const [report, setReport] = useState([]);

  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 230,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "total_order",
      headerName: "Total Order",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "compelet_order",
      headerName: "Complete Order",
      width: 230,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sell",
      headerName: "Sell",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
  ];

  const { data: reports = [] } = useQuery(["report", date], async () => {
    const res = await myAxios(
      `monthly_report/${date.format("MM")}/${date.format("YYYY")}/`
    );
    const allData = res.data?.map((data, index) => {
      return {
        id: index,
        date: data?.date,
        total_order: data?.total_order,
        compelet_order: data?.compelet_order,
        sell: data?.sell,
      };
    });
    setReport(allData);
    //   return;
    //   setReport(allData);
  });
  console.log(reports);

  return (
    <div style={{ height: 510, width: "100%" }}>
      <Box sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}>
        <DatePicker
          value={date}
          views={["month", "year"]}
          onChange={(newValue) => setDate(newValue)}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      </Box>
      <DataGrid
        sx={{
          // "& .MuiDataGrid-columnHeader": { backgroundColor: "#FFC446" },
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
        rows={report}
        columns={columns}
        // orderRefetch={orderRefetch}
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
              disableToolbarButton: false,
            },
            csvOptions: {
              disableToolbarButton: false,
            },
          },
        }}
      />
    </div>
  );
};

export default Report;
