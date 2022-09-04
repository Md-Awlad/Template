import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../../Contexts/ContextProvider";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import myAxios from "../../utils/myAxios";
import DeleteOrder from "../Modals/DeleteOrder";
import { toast } from "react-toastify";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const OrderList = () => {
  const { currentColor, currentMode } = useStateContext();
  const { handleSubmit } = useForm();
  const [deleteId, setDeleteId] = useState(null);
  const [complete, setComplete] = useState();

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
            <RiDeleteBin6Line
              onClick={() => setDeleteId(row?.id)}
              className="text-red-400 dark:text-neutral text-xl cursor-pointer"
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <button
                onClick={() => setComplete(row.id)}
                className=" p-1 text-md font-medium text-green-800"
              >
                <TaskAltIcon />
              </button>
            </form>
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
  const orderConfirmMutation = useMutation(
    (payloadForm) =>
      toast.promise(myAxios.patch(`/order/${complete}/`, payloadForm), {
        pending: "Process your order...",
        success: "Confirmed your order",
        error: "Error order confirmed!",
      }),
    {
      onSuccess: () => {
        orderRefetch();
      },
    }
  );

  const onSubmit = async (data) => {
    const payloadForm = {
      is_done: Boolean(complete),
    };
    orderConfirmMutation.mutate(payloadForm);
  };

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
