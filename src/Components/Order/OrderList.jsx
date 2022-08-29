import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../../Contexts/ContextProvider";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import myAxios from "../../utils/myAxios";

const OrderList = () => {
  const { currentColor, currentMode } = useStateContext();
  const [item, setItem] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "name", headerName: "Customer Name", width: 230 },
    { field: "order_type", headerName: "Order Type", width: 230 },
    { field: "phone", headerName: "Mobile", width: 200 },
    {
      field: "order_items",
      headerName: "Order Items",
      width: 250,
      renderCell: (value) => {
        console.log(value?.row?.note);
        const vl = value?.row?.note?.order_items.map((item) => item);
        console.log(vl.map((a) => a.id));
        return value?.row?.note?.order_items.map((item) => {
          return (
            <div>
              <h2>{item.id}, </h2>
            </div>
          );
        });
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 250,
      renderCell: (value) => {
        // console.log(value?.row?.note?.order_items.map((item) => item.price));
        return value?.row?.note?.order_items.map((item) => {
          return (
            <div>
              <h2>{item.quantity}</h2>
            </div>
          );
        });
      },
    },
    { field: "price", headerName: "Amount", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <RiDeleteBin6Line className="text-dark-color dark:text-neutral text-xl cursor-pointer" />
        );
      },
    },
  ];

  const { data: orders = [], refetch: orderRefetch } = useQuery(
    ["order"],
    async () => {
      const res = await myAxios("/order/");
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
