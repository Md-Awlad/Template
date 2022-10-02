import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";
import DeleteOrder from "../../Modals/Admin/DeleteOrder";
import RejectOrder from "../../Modals/Admin/RejectOrder";
import { Badge, Box, Button, Paper, Typography } from "@mui/material";
import { MdEmail, MdOutlineAddShoppingCart } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BsCheck2Circle } from "react-icons/bs";

const OrderList = ({ orders, orderRefetch }) => {
  const { currentColor, currentMode } = useStateContext();
  const { handleSubmit } = useForm();
  const [deleteId, setDeleteId] = useState(null);
  const [complete, setComplete] = useState();
  const [reject, setReject] = useState(null);

  // const columns = [
  //   {
  //     field: "id",
  //     headerName: "ID",
  //     width: 100,
  //     headerAlign: "center",
  //     align: "center",
  //   },
  //   {
  //     field: "name",
  //     headerName: "Customer Name",
  //     width: 180,
  //     headerAlign: "center",
  //     align: "center",
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email",
  //     width: 180,
  //     headerAlign: "center",
  //     align: "center",
  //   },
  //   {
  //     field: "table",
  //     headerName: "Table Number",
  //     width: 130,
  //     headerAlign: "center",
  //     align: "center",
  //   },
  //   {
  //     field: "order_type",
  //     headerName: "Order Type",
  //     width: 120,
  //     headerAlign: "center",
  //     align: "center",
  //   },
  //   {
  //     field: "phone",
  //     headerName: "Mobile",
  //     width: 150,
  //     headerAlign: "center",
  //     align: "center",
  //   },
  //   {
  //     field: "order_items",
  //     headerName: "Order Items",
  //     width: 220,
  //     headerAlign: "center",
  //     align: "center",
  //     renderCell: (value) => {
  //       return (
  //         <div className="w-full h-12 overflow-y-auto mt-5 text-center">
  //           {value?.row?.order_items?.map((item, index) => {
  //             return <h2 key={index}>{item.food_name}</h2>;
  //           })}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     field: "quantity",
  //     headerName: "Quantity",
  //     width: 100,
  //     headerAlign: "center",
  //     align: "center",
  //     renderCell: (value) => {
  //       return (
  //         <div className="w-full h-12 overflow-y-auto mt-5 text-center">
  //           {value?.row?.note?.order_items?.map((item, index) => {
  //             return <h2 key={index}>{item.quantity}</h2>;
  //           })}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     field: "ingredient_name",
  //     headerName: "Extra Ingredients",
  //     width: 150,
  //     headerAlign: "center",
  //     align: "center",
  //     renderCell: ({ row }) => {
  //       return (
  //         <div className="w-full h-14 overflow-y-auto mt-5 text-center">
  //           {row?.note?.order_items?.map((item) =>
  //             item?.extra?.map((data, index) => {
  //               return <h2 key={index}>{data.name}</h2>;
  //             })
  //           )}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     field: "price",
  //     headerName: "Total Amount",
  //     width: 150,
  //     headerAlign: "center",
  //     align: "center",
  //   },
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 130,
  //     headerAlign: "center",
  //     align: "center",
  //     renderCell: ({ row }) => {
  //       return (
  //         <div className="flex items-center gap-2">
  //           <RiDeleteBin6Line
  //             onClick={() => setDeleteId(row?.id)}
  //             className="text-red-400 dark:text-neutral text-xl cursor-pointer"
  //           />
  //           <form onSubmit={handleSubmit(onSubmit)}>
  //             <button
  //               onClick={() => setComplete(row.id)}
  //               className=" p-1 text-md font-medium text-green-800"
  //             >
  //               <TaskAltIcon />
  //             </button>
  //           </form>
  //           <button
  //             onClick={() => setReject(row.id)}
  //             className=" p-1 text-md font-medium text-red-400"
  //           >
  //             <HighlightOffIcon />
  //           </button>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  // const { data: orders = [], refetch: orderRefetch } = useQuery(
  //   ["order"],
  //   async () => {
  //     const res = await myAxios("/order/");
  //     return res.data;
  //   }
  // );
  console.log(orders?.map((a) => a));
  // console.log(orders.map((a) => a));
  // console.log(
  //   orders?.map((a) => a?.note?.order_items?.map((data) => data.quantity))
  // );

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
    <>
      {/* <div style={{ height: 510, width: "100%" }}>
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
        {Boolean(reject) && (
          <RejectOrder
            reject={reject}
            handleModalClose={() => setReject(null)}
          />
        )}
        {Boolean(deleteId) && (
          <DeleteOrder
            deleteId={deleteId}
            handleClose={() => setDeleteId(null)}
          />
        )}
      </div> */}
      {/* <Badge
        sx={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "flex-end",
          my: 2,
        }}
        className="cursor-pointer"
        badgeContent={orders.length}
        color="primary"
      >
      
        <MdOutlineAddShoppingCart
          className="inline w-8 h-8 cursor-pointer"
          color="action"
        />
      </Badge> */}
      <Typography
        sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}
        variant="h6"
      >
        Now Orders: {orders.length ? orders.length : "00"}
      </Typography>
      <Box
        sx={{
          display: "grid",
          justifyItems: { xs: "center" },
          gridTemplateColumns: {
            md: "repeat(4,1fr)",
            sm: "repeat(2,1fr)",
            xs: "repeat(1,1fr)",
          },
          gap: 2,
        }}
      >
        {orders?.map((item) => (
          <Paper
            className="space-y-1"
            key={item.id}
            sx={{
              width: 250,
              height: 300,
              overflowY: "scroll",
              px: 2,
              py: 1,
              boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 20%)",
              border: "1px solid #ccc",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                style={{ color: currentColor }}
                sx={{ fontSize: 14, fontWeight: 500 }}
                variant="h6"
              >
                Order ID: {item?.id}
              </Typography>
              <Typography
                style={{ color: currentColor }}
                sx={{ fontSize: 14, fontWeight: 500 }}
                variant="h6"
              >
                Table No: {item?.table}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 500 }} variant="h6">
                Name: {item?.note?.name}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: 14,
                  fontWeight: 500,
                }}
                variant="h6"
              >
                <FaPhoneAlt /> {item?.note?.phone}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: 14,
                  fontWeight: 500,
                }}
                variant="h6"
              >
                <MdEmail /> {item?.note?.email}
              </Typography>
            </Box>
            <hr className="border-[#FFC446]" />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  style={{ color: currentColor }}
                  sx={{ fontSize: 14, fontWeight: 500 }}
                  variant="h6"
                >
                  Order Items
                </Typography>
                {item?.order_items?.map((data, index) => (
                  <Typography
                    key={index}
                    sx={{ fontSize: 14, fontWeight: 500 }}
                    variant="h6"
                  >
                    {data?.food_name}
                  </Typography>
                ))}
              </Box>
              <Box>
                <Typography
                  style={{ color: currentColor }}
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  variant="h6"
                >
                  Quantity
                </Typography>
                {item?.note?.order_items?.map((data) => (
                  <Box key={data.id}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                      variant="h6"
                    >
                      {data?.quantity}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            {/* --extra-- */}
            <Box>
              <Typography
                style={{ color: currentColor }}
                sx={{ fontSize: 14, fontWeight: 500 }}
                variant="h6"
              >
                Extra Ingredients
              </Typography>
              {item?.note?.order_items?.map((data) => (
                <Box key={data.id}>
                  {data?.extra?.map((extra, index) => (
                    <Typography
                      key={index}
                      sx={{ fontSize: 14, fontWeight: 500 }}
                      variant="h6"
                    >
                      {extra?.name}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
            <hr className="border-[#FFC446]" />
            <Box className="space-y-7">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: 18, fontWeight: 500 }} variant="h6">
                  Total Amount:
                </Typography>
                <Typography sx={{ fontSize: 18, fontWeight: 500 }} variant="h6">
                  $ {item?.price}
                </Typography>
              </Box>
              {/* --actionbtn-- */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <BsCheck2Circle
                    onClick={() => setComplete(item.id)}
                    className="text-green-900 dark:text-neutral text-2xl cursor-pointer"
                  />
                </form>

                <HighlightOffIcon
                  onClick={() => setReject(item.id)}
                  className="text-red-900 dark:text-neutral text-2xl cursor-pointer"
                />

                <RiDeleteBin6Line
                  onClick={() => setDeleteId(item.id)}
                  className="text-blue-900 dark:text-neutral text-2xl cursor-pointer"
                />
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
      {Boolean(reject) && (
        <RejectOrder reject={reject} handleModalClose={() => setReject(null)} />
      )}
      {Boolean(deleteId) && (
        <DeleteOrder
          deleteId={deleteId}
          handleClose={() => setDeleteId(null)}
        />
      )}
    </>
  );
};

export default OrderList;
