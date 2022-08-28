import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../../Contexts/ContextProvider";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import myAxios from "../../utils/myAxios";
import { MdModeEdit } from "react-icons/md";

const OrderList = () => {
  const { currentColor, currentMode } = useStateContext();
  const [anchorEl, setAnchorEl] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "order_type", headerName: "Customer Name", width: 230 },
    { field: "phone", headerName: "Mobile", width: 200 },
    { field: "order", headerName: "Order Item", width: 250 },
    { field: "price", headerName: "Amount", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <div className="flex gap-5 items-center">
            <MdModeEdit className="text-dark-color dark:text-neutral text-xl cursor-pointer" />
            <RiDeleteBin6Line className="text-dark-color dark:text-neutral text-xl cursor-pointer" />
          </div>
        );
      },
    },
  ];

  const { data: orders = [], refetch: orderRefetch } = useQuery(
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
          "& .MuiDataGrid-columnHeader": { backgroundColor: `${currentColor}` },
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
        rows={orders}
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

export default OrderList;
