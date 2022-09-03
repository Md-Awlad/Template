import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../../Contexts/ContextProvider";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import myAxios from "../../utils/myAxios";
import DeleteOrder from "../Modals/DeleteOrder";

const OrderList = () => {
  const { currentColor, currentMode } = useStateContext();
  const [deleteId, setDeleteId] = useState(null);
  const [complete, setComplete] = useState(false);

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
        return (
          <div className="w-full h-12 overflow-y-auto">
            {value?.row?.order_items.map((item) => {
              return <h2>{item.food_name}</h2>;
            })}
          </div>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 250,
      renderCell: (value) => {
        return (
          <div className="w-full h-12 overflow-y-auto">
            {value?.row?.note?.order_items.map((item) => {
              return <h2>{item.quantity}</h2>;
            })}
          </div>
        );
      },
    },
    { field: "price", headerName: "Amount", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDeleteId(row.id)}
              className="flex items-center gap-1 bg-red-400 text-white w-20 py-1 justify-center rounded-md text-sm shadow-lg"
            >
              <RiDeleteBin6Line />
              <h3>Delete</h3>
            </button>
            {complete ? (
              <button className="bg-green-800 text-white border px-3 py-1 text-sm font-medium rounded-md">
                Complete
              </button>
            ) : (
              <button className="bg-yellow-700 text-white border px-3 py-1 text-sm font-medium rounded-md">
                Pending...
              </button>
            )}
            <FaEye />
          </div>
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
        rows={orders}
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
        // checkboxSelection
        // disableSelectionOnClick
      />
      {Boolean(deleteId) && (
        <DeleteOrder
          deleteId={deleteId}
          handleClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default OrderList;
