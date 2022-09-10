import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../../../Contexts/ContextProvider";
import DeleteConfirmOrder from "../../Modals/Admin/DeleteConfirmOrder";

const CompleteOrderList = ({ completes }) => {
  const { currentColor, currentMode } = useStateContext();
  const [deleteId, setDeleteId] = useState();

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "table", headerName: "Table Number", width: 130 },
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
      width: 150,
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
    { field: "price", headerName: "Amount", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: ({ row }) => {
        return (
          <button>
            <RiDeleteBin6Line
              onClick={() => setDeleteId(row?.id)}
              className="text-red-400 dark:text-neutral text-xl cursor-pointer"
            />
          </button>
        );
      },
    },
  ];

  return (
    <div>
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
          rows={completes}
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
      {Boolean(deleteId) && (
        <DeleteConfirmOrder
          deleteId={deleteId}
          handleClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default CompleteOrderList;
