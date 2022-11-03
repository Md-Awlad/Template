import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useStateContext } from "../../../Contexts/ContextProvider";
import LoaderSource from "../../Loaders/LoaderSource";
import DeleteConfirmOrder from "../../Modals/Admin/DeleteConfirmOrder";

const CompleteOrderList = ({ completes, isLoading, isError }) => {
  const { currentColor } = useStateContext();
  const [deleteId, setDeleteId] = useState();

  return (
    <div>
      {isLoading ? (
        <LoaderSource />
      ) : isError ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Could not get Complete Orders
        </Alert>
      ) : (
        <>
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
              position: "relative",
            }}
          >
            {completes?.map((item) => (
              <Paper
                key={item.id}
                className="space-y-1 dark:bg-secondary-dark-bg dark:text-neutral"
                sx={{
                  height: 350,
                  overflowY: "scroll",
                  px: 2,
                  py: 1,
                  boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 20%)",
                  border: "1px solid #ccc",
                }}
              >
                <Typography
                  style={{ color: currentColor }}
                  sx={{ fontSize: 15, fontWeight: 500, textAlign: "center" }}
                  variant="h6"
                >
                  Order ID: {item?.id}
                </Typography>
                <Box sx={{ display: "flex", gap: 8 }}>
                  <Typography
                    style={{ color: currentColor }}
                    sx={{ fontSize: 14, fontWeight: 500 }}
                    variant="h6"
                  >
                    Order Type:{" "}
                    {`${
                      item?.order_type === "takeaway"
                        ? "Takeaway"
                        : item?.order_type === "dine_in" && "Dine In"
                    }`}
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
                  <Typography
                    sx={{ fontSize: 14, fontWeight: 500 }}
                    variant="h6"
                  >
                    Name: {item?.customer_name}
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
                    <FaPhoneAlt /> {item?.customer_phone}
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
                    <MdEmail /> {item?.customer_mail}
                  </Typography>
                </Box>
                <hr className="border-[#F0A70B]" />
                {/* <--- order Items ---> */}
                <Box className="flex justify-between py-2">
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
                  {/* --extra-- */}
                  <Box>
                    <Typography
                      style={{ color: currentColor }}
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
                  {/* --quantity-- */}
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
                {/* <--action Button--> */}
                <Box className="text-center">
                  <Button
                    sx={{
                      width: 1,
                    }}
                    color="error"
                    variant="contained"
                    onClick={() => setDeleteId(item.id)}
                  >
                    Remove
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        </>
      )}
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
