import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";
import { MdModeEdit } from "react-icons/md";

const Pizza = () => {
  const { currentColor, currentMode } = useStateContext();

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <img src={params.row.image} alt={Image} />
          </div>
        );
      },
    },
    { field: "food_name", headerName: "Food Name", width: 200 },
    { field: "food_price", headerName: "Price", width: 130 },
    { field: "food_detail", headerName: "Details", width: 208 },
    { field: "review", headerName: "Review", width: 130 },
    {
      field: "is_recommended",
      headerName: "Recommended",
      width: 130,
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
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (data) => {
        // const onClick = (e) => {
        //   e.stopPropagation();
        //   setAnchorEl(e.currentTarget);
        // };
        return (
          <div className="flex gap-5 items-center">
            <MdModeEdit className="text-dark-color dark:text-neutral text-xl cursor-pointer" />
            <RiDeleteBin6Line className="text-dark-color dark:text-neutral text-xl cursor-pointer" />
          </div>
        );
      },
    },
  ];

  const { data: foods = [], refetch: foodRefetch } = useQuery(
    ["food"],
    async () => {
      const res = await myAxios("/food/");
      return res.data;
    }
  );

  return (
    <div style={{ height: 510, width: "100%" }}>
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeader": { backgroundColor: "#FFC446" },
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
        rows={foods}
        columns={columns}
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
        // checkboxSelection
        // disableSelectionOnClick
      />
    </div>
  );
};

export default Pizza;
