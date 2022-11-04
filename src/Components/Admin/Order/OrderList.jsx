import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";
import DeleteOrder from "../../Modals/Admin/DeleteOrder";
import RejectOrder from "../../Modals/Admin/RejectOrder";
import {
  Alert,
  AlertTitle,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BsCheck2Circle } from "react-icons/bs";
import LoaderSource from "../../Loaders/LoaderSource";

const OrderList = ({ orders, orderRefetch, isLoading, isError }) => {
  const { currentColor, restaurantData } = useStateContext();
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
                <Box sx={{ height: 300, overflowY: "scroll", px: 1 }}>
                  <Box className="flex justify-between items-center">
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
                  <hr className="border-[#F0A70B]" />
                  {/* <--- order Items ---> */}

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
                    {/* --extra--  */}
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
                    {/* --quantity--  */}
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
                  <hr className="border-[#F0A70B]" />
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
                    <button>
                      <BsCheck2Circle
                        onClick={() => setComplete(item.id)}
                        className="text-success dark:text-success text-2xl cursor-pointer mt-1"
                      />
                    </button>
                  </form>

                  <HighlightOffIcon
                    onClick={() => setReject(item.id)}
                    className="text-error dark:text-error text-2xl cursor-pointer"
                  />

                  <RiDeleteBin6Line
                    onClick={() => setDeleteId(item.id)}
                    className="text-blue-900 dark:text-blue-600 text-2xl cursor-pointer"
                  />
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
<TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Items</TableCell>
                          <TableCell>Extra</TableCell>
                          <TableCell>Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {item.order_items?.map((data, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {data.food_name}
                            </TableCell>
                            {item?.order_items?.map((data, index) => (
                              <TableCell key={index} align="right">
                                {data?.extra?.map(
                                  (extra, index) =>
                                    `${extra?.name}${
                                      data?.extra?.length - 1 === index
                                        ? ""
                                        : ","
                                    } `
                                )}
                              </TableCell>
                            ))}
                            <TableCell align="right">{data.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>




                   <Box className="flex justify-between py-2">
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
