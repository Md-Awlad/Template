import React, { useState } from "react";
import GppBadIcon from "@mui/icons-material/GppBad";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import myAxios from "../../../utils/myAxios";
import DeleteOrder from "../../Modals/Admin/DeleteOrder";
import RejectOrder from "../../Modals/Admin/RejectOrder";
import {
  Alert,
  AlertTitle,
  Box,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { MdEmail } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { BsCheck2Circle } from "react-icons/bs";
import LoaderSource from "../../Loaders/LoaderSource";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const OrderList = ({ orders, orderRefetch, isLoading, isError }) => {
  const { handleSubmit } = useForm();
  const [deleteId, setDeleteId] = useState(null);
  const [complete, setComplete] = useState();
  const [reject, setReject] = useState(null);

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
      {isLoading ? (
        <LoaderSource />
      ) : isError ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Could not get Orders
        </Alert>
      ) : (
        <>
          <Typography
            className="dark:text-neutral"
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
                md: "repeat(3,1fr)",
                sm: "repeat(2,1fr)",
                xs: "repeat(1,1fr)",
              },
              gap: 2,
            }}
          >
            {orders?.map((item) => (
              <Paper
                key={item.id}
                className="space-y-1 dark:bg-secondary-dark-bg dark:text-neutral"
                sx={{
                  px: 1,
                  py: 1,
                  boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 20%)",
                  border: "1px solid #ccc",
                }}
              >
                <Box
                  sx={{ height: 300, overflowY: "scroll", px: 1 }}
                  className="space-y-2"
                >
                  <Box className="flex justify-between flex-wrap items-center">
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 500 }}
                      variant="h6"
                    >
                      Order ID :{" "}
                      <Typography
                        component={"span"}
                        sx={{ fontSize: 14, fontWeight: 600 }}
                        variant="h6"
                      >
                        {item?.id}
                      </Typography>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} variant="h6">
                      Table No:{" "}
                      <Typography
                        component={"span"}
                        sx={{ fontSize: 15, fontWeight: 600 }}
                        variant="h6"
                      >
                        {item?.table}
                      </Typography>
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 14 }} variant="h6">
                      Order Type :{" "}
                      <Typography
                        component={"span"}
                        sx={{ fontSize: 15, fontWeight: 600 }}
                        variant="h6"
                      >
                        {`${
                          item?.order_type === "takeaway"
                            ? "Takeaway"
                            : item?.order_type === "dine_in" && "Dine In"
                        }`}
                      </Typography>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} variant="h6">
                      Name :{" "}
                      <Typography
                        component={"span"}
                        sx={{ fontSize: 15, fontWeight: 600 }}
                        variant="h6"
                      >
                        {item?.customer_name}
                      </Typography>
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: 14,
                      }}
                      variant="h6"
                    >
                      <FaPhoneAlt />

                      <Typography
                        component={"span"}
                        sx={{ fontSize: 14, fontWeight: 600 }}
                        variant="h6"
                      >
                        {item?.customer_phone}
                      </Typography>
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
                      <MdEmail />
                      <Typography
                        component={"span"}
                        sx={{ fontSize: 14, fontWeight: 600 }}
                        variant="h6"
                      >
                        {item?.customer_mail}
                      </Typography>
                    </Typography>
                  </Box>
                  {/* <--- order Items ---> */}
                  <TableContainer>
                    <Table aria-label="customized table">
                      <TableHead
                        sx={{
                          "& .MuiTableCell-head": {
                            bgcolor: "#C0C0C0 !important",
                            color: "#000 !important",
                          },
                        }}
                      >
                        <TableRow>
                          <StyledTableCell>Items</StyledTableCell>
                          <StyledTableCell>Extra</StyledTableCell>
                          <StyledTableCell>Quantity</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {item?.order_items.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                              {row.food_name}
                            </StyledTableCell>

                            <StyledTableCell component="th" scope="row">
                              {row?.extra?.map(
                                (extra, index) =>
                                  `${extra?.name}  ${
                                    row?.extra?.length - 1 === index ? "" : ","
                                  } `
                              )}
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {row.quantity}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <---- amount ----> */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 18, fontWeight: 500 }}
                      variant="h6"
                    >
                      Total Amount:
                    </Typography>
                    <Typography
                      sx={{ fontSize: 18, fontWeight: 500 }}
                      variant="h6"
                    >
                      {item?.price} ৳
                    </Typography>
                  </Box>
                </Box>
                {/* --action button-- */}
                <Box className="flex justify-between items-center mt-2">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Tooltip title="Confirmed Order" placement="top">
                      <IconButton aria-label="delete" size="large">
                        <button onClick={() => setComplete(item.id)}>
                          <BsCheck2Circle className="text-success dark:text-success text-2xl cursor-pointer" />
                        </button>
                      </IconButton>
                    </Tooltip>
                  </form>
                  <Tooltip title="Rejected Order" placement="top">
                    <IconButton aria-label="delete" size="large">
                      <DisabledByDefaultIcon
                        onClick={() => setReject(item.id)}
                        className="text-error dark:text-error text-2xl cursor-pointer"
                      />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Deleted Order" placement="top">
                    <IconButton aria-label="delete" size="large">
                      <DeleteIcon
                        onClick={() => setDeleteId(item.id)}
                        className="text-blue-900 dark:text-blue-600 text-2xl cursor-pointer"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            ))}
          </Box>
        </>
      )}

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

/*
<Box className="flex gap-4 py-2">
  <Box>
    <Typography
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
    --extra--  
  <Box>
    <Typography
      sx={{ fontSize: 14, fontWeight: 500 }}
      variant="h6"
    >
      Extra Ingred..
    </Typography>

    {item?.order_items?.map((data, index) => (
      <Typography
        key={index}
        sx={{ fontSize: 14, fontWeight: 500 }}
        variant="h6"
      >
        {data?.extra?.map(
          (extra, index) =>
            `${extra?.name} 
      ${data?.extra?.length - 1 === index ? "" : ","} `
        )}
      </Typography>
    ))}
  </Box>
    --quantity--  
  <Box>
    <Typography
      sx={{
        fontSize: 14,
        fontWeight: 500,
      }}
      variant="h6"
    >
      Quantity
    </Typography>
    {item?.order_items?.map((data, index) => (
      <Typography
        key={index}
        sx={{
          fontSize: 14,
          fontWeight: 500,
          textAlign: "center",
        }}
        variant="h6"
      >
        {data?.quantity}
      </Typography>
    ))}
  </Box>
</Box>

*/
