import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FiPrinter } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../../../Contexts/ContextProvider";
import DeleteConfirmOrder from "../../Modals/Admin/DeleteConfirmOrder";

const CompleteOrderList = ({ completes }) => {
  const { currentColor, currentMode } = useStateContext();
  const [print, setPrint] = useState();
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
      field: "phone",
      headerName: "Mobile",
      width: 150,
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
            {/* <button
              onClick={() => setPrint(row.id)}
              className="dark:text-neutral text-xl cursor-pointer"
            >
              <FiPrinter />
            </button> */}
          </div>
        );
      },
    },
  ];

  return (
    <div>
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
      </div> */}
      <Typography
        className="dark:text-neutral"
        sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}
        variant="h6"
      >
        Orders Complete : {completes.length ? completes.length : "00"}
      </Typography>
      <Box
        sx={{
          display: "grid",
          justifyItems: { xs: "center" },
          gridTemplateColumns: {
            md: "repeat(3,1fr)",
            sm: "repeat(2,1fr)",
            xs: "repeat(1,1fr)",
          },
          gap: 2,
        }}
      >
        {completes?.map((item) => (
          <Paper
            key={item.id}
            className="space-y-1 dark:bg-secondary-dark-bg dark:text-neutral"
            sx={{
              height: 300,
              overflowY: "scroll",
              px: 2,
              py: 1,
              boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 20%)",
              border: "1px solid #ccc",
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
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
                Order Type: {item?.order_type}
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
            <hr className="border-[#F0A70B]" />
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
            <hr className="border-[#F0A70B]" />
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
                  {item?.price} ৳
                </Typography>
              </Box>
              {/* --actionbtn-- */}

              <Button
                sx={{ width: 1 }}
                color="error"
                variant="outlined"
                onClick={() => setDeleteId(item.id)}
              >
                Remove
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
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
