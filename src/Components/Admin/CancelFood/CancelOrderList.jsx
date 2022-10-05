import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../../../Contexts/ContextProvider";
import DeleteCancelOrder from "../../Modals/Admin/DeleteCancelOrder";

const CancelOrderList = ({ cancelOrder }) => {
  console.log(cancelOrder);
  const { currentColor, currentMode } = useStateContext();
  const [deleteId, setDeleteId] = useState();
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Customer Name",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "table",
      headerName: "Table Number",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "order_type",
      headerName: "Order Type",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "Mobile",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "order_items",
      headerName: "Order Items",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (value) => {
        return (
          <div className="w-full h-12 overflow-y-auto my-5 text-center">
            {value?.row?.order_items?.map((item, index) => {
              return <h2 key={index}>{item.food_name}</h2>;
            })}
          </div>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (value) => {
        return (
          <div className="w-full h-12 overflow-y-auto my-5 text-center">
            {value?.row?.note?.order_items?.map((item, index) => {
              return <h2 key={index}>{item.quantity}</h2>;
            })}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Amount",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <RiDeleteBin6Line
              onClick={() => setDeleteId(row?.id)}
              className="text-red-400 dark:text-neutral text-xl cursor-pointer"
            />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div style={{ height: 510, width: "100%" }}>
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
          rows={cancelOrder}
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
        <DeleteCancelOrder
          deleteId={deleteId}
          handleClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default CancelOrderList;
