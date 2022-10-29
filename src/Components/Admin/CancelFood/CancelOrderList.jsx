import { Alert, AlertTitle, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../../../Contexts/ContextProvider";
import LoaderSource from "../../Loaders/LoaderSource";
import DeleteCancelOrder from "../../Modals/Admin/DeleteCancelOrder";

const CancelOrderList = ({ cancelOrder, isLoading, isError }) => {
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
      renderCell: ({ row }) => {
        return (
          <Tooltip title={row?.email} placement="top">
            <Typography>{row?.email}</Typography>
          </Tooltip>
        );
      },
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
      renderCell: ({ row }) => {
        return (
          <Typography>{`${
            row?.order_type === "takeaway"
              ? "Takeaway"
              : row?.order_type === "dine_in" && "Dine In"
          }`}</Typography>
        );
      },
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
          <Tooltip
            title={value?.row?.order_items?.map((item, index) => {
              return <Typography key={index}>{item.food_name}</Typography>;
            })}
            placement="top"
          >
            <div className="w-full h-12 overflow-y-auto my-5 text-center">
              {value?.row?.order_items?.map((item, index) => {
                return <h2 key={index}>{item.food_name}</h2>;
              })}
            </div>
          </Tooltip>
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
          <Box className="flex items-center gap-3">
            <Tooltip title="Cancel Food" placement="top">
              <RiDeleteBin6Line
                onClick={() => setDeleteId(row?.id)}
                className="text-red-400 dark:text-neutral text-xl cursor-pointer"
              />
            </Tooltip>
          </Box>
        );
      },
    },
  ];
  return (
    <>
      <div style={{ height: 510, width: "100%" }}>
        {isLoading ? (
          <LoaderSource />
        ) : isError ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Could not get Cancel Orders
          </Alert>
        ) : (
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
        )}
      </div>
      {Boolean(deleteId) && (
        <DeleteCancelOrder
          deleteId={deleteId}
          handleClose={() => setDeleteId(null)}
        />
      )}
    </>
  );
};

export default CancelOrderList;
