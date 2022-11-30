import { TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";
import LoaderSource from "../../Loaders/LoaderSource";

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

  const { data: reports = [], isLoading } = useQuery(
    ["report", date],
    async () => {
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
    }
  );

  return (
    <div style={{ height: 510, width: "100%" }} className="space-y-3">
      <DatePicker
        views={["year", "month"]}
        value={date}
        onChange={(newValue) => {
          setDate(moment(newValue));
        }}
        renderInput={(params) => (
          <TextField
            sx={{
              width: 200,
              ".MuiInputBase-input": {
                padding: 1.2,
                // color: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            {...params}
          />
        )}
      />
      {isLoading ? (
        <LoaderSource />
      ) : (
        <DataGrid
          sx={{
            // "& .MuiDataGrid-columnHeader": { backgroundColor: "#F0A70B" },
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
      )}
    </div>
  );
};

export default Report;
