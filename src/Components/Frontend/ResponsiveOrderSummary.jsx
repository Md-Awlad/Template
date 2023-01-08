import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import { useStateContext } from "../../Contexts/ContextProvider";
import { baseURL } from "../../utils/myAxios";
import Footer from "./Footer";
import Header from "./Header";
import ResponsiveBottomMenu from "./ResponsiveBottomMenu";

const ResponsiveOrderSummery = () => {
  const { orderId, expandedMenu } = useStateContext();
  const componentRef = useRef();
  const [orderSummary, setOrderSummary] = React.useState([]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useQuery(["orderSummary"], async () => {
    fetch(`${baseURL}/order_summery/${orderId}/`)
      .then((res) => res.json())
      .then((data) => setOrderSummary(data));
  });
  return (
    <Box
      ref={componentRef}
      sx={{
        width: 1,
        "@media print": {
          padding: 4,
          "@page": {
            size: "A4",
          },
        },
      }}
    >
      {expandedMenu ? <Header /> : <ResponsiveBottomMenu />}
      {/* <Header /> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 0,
          "@media print": {
            p: 5,
          },
        }}
      >
        <Button
          size="small"
          variant="outlined"
          onClick={handlePrint}
          className="space-x-2"
          sx={{
            display: "flex",
            mt: 3,
            color: "primary.main",

            "@media print": {
              display: "none",
            },
            marginX: { md: 8, xs: 4 },
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: 13,
            }}
          >
            Print
          </Typography>
          <CloudDownloadIcon />
        </Button>
      </Box>
      <Box sx={{ marginX: { md: 8, xs: 4 } }}>
        <BsCheckCircle className="text-3xl text-green-600 m-auto" />
        <Box sx={{ textAlign: "center" }}>
          <Typography component="span" variant="h6">
            We've received your order
          </Typography>
          <Typography component="span" variant="h6">
            Order ID: # {orderSummary.order_id}
          </Typography>
        </Box>
        <Box className="space-y-3">
          {/* --details-- */}
          <Box>
            <Typography component="span" variant="h6">
              Order Details
            </Typography>
            <Typography
              component="span"
              variant="h6"
              sx={{ fontSize: { xs: 14 } }}
            >
              {orderSummary.name && `Name: ${orderSummary?.name}`}
            </Typography>
            <Typography
              component="span"
              variant="h6"
              sx={{ fontSize: { xs: 14 } }}
            >
              Phone: {orderSummary.phone}
            </Typography>
            <Typography
              component="span"
              variant="h6"
              sx={{ fontSize: { xs: 14 } }}
            >
              Order Type: {orderSummary.order_type}
            </Typography>
          </Box>

          {/* --orderSummary-- */}
          <Box>
            <Typography component="span" variant="h6">
              Order Summary
            </Typography>
            <Box>
              <Typography component="span" variant="h6" sx={{ fontSize: 18 }}>
                Order Items
              </Typography>
              {orderSummary.order_items?.map((data, index) => (
                <Box key={index}>
                  <Box className="flex justify-between items-center">
                    <Box className="flex gap-2 items-center">
                      <Typography component="span">
                        {data?.quantity && `${data?.quantity} X`}
                      </Typography>
                      <Typography component="span">
                        {data?.food_name}
                      </Typography>
                    </Box>
                    <Typography component="span" sx={{ fontWeight: 600 }}>
                      {data?.food_amount}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Typography component="span" variant="h6" sx={{ fontSize: 18 }}>
                Extra Ingredients
              </Typography>
              {orderSummary.order_items?.map((data, index) => (
                <Box key={index} className="flex justify-between">
                  <Typography
                    component="span"
                    sx={{
                      width: 135,
                      borderBottom: `1px dashed #707070`,
                    }}
                  >
                    {data?.extra?.map(
                      (ex, index) =>
                        `${ex?.name} ${
                          data?.extra.length - 1 === index ? "" : ","
                        }`
                    )}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 600,
                      borderBottom: `1px dashed #707070`,
                      width: 70,
                      textAlign: "right",
                    }}
                  >
                    {data?.extra?.map(
                      (ex, index) =>
                        `${ex?.price} ${
                          data?.extra.length - 1 === index ? "" : ","
                        }`
                    )}
                  </Typography>
                </Box>
              ))}
              <Typography component="span" variant="h6" sx={{ fontSize: 18 }}>
                Size
              </Typography>
              {orderSummary.order_items?.map((data, index) => (
                <Box sx={{ mt: -3 }} key={index} className="flex justify-end">
                  <Typography component="span" sx={{ pb: 2, fontWeight: 600 }}>
                    {data?.price}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box className="mb-20 mt-2">
              <Box className="grid grid-cols-3 gap-8">
                <Typography
                  component="span"
                  variant="h6"
                  sx={{ fontSize: { xs: 14 } }}
                >
                  Packaging
                </Typography>
                <Typography
                  component="span"
                  variant="h6"
                  sx={{ fontSize: { xs: 14 } }}
                >
                  :
                </Typography>
                <Typography
                  component="span"
                  variant="h6"
                  sx={{
                    fontSize: { xs: 14 },
                    textAlign: "right",
                    fontWeight: 600,
                  }}
                >
                  {orderSummary.packaging || "00"}
                </Typography>
              </Box>
              <Box className="grid grid-cols-3 gap-8 ">
                <Typography
                  component="span"
                  variant="h6"
                  sx={{ fontSize: { xs: 14 } }}
                >
                  Total
                </Typography>
                <Typography
                  component="span"
                  variant="h6"
                  sx={{ fontSize: { xs: 14 } }}
                >
                  :
                </Typography>
                <Typography
                  component="span"
                  variant="h6"
                  sx={{
                    fontSize: { xs: 14 },
                    textAlign: "right",
                    fontWeight: 600,
                  }}
                >
                  {orderSummary.sub_total || "00"}
                </Typography>
              </Box>
              <Box className="grid grid-cols-3 gap-8">
                <Typography
                  component="span"
                  variant="h6"
                  sx={{ fontSize: { xs: 14 } }}
                >
                  Discount
                </Typography>
                <Typography
                  component="span"
                  variant="h6"
                  sx={{ fontSize: { xs: 14 } }}
                >
                  :
                </Typography>
                <Typography
                  component="span"
                  variant="h6"
                  sx={{
                    fontSize: { xs: 14 },
                    textAlign: "right",
                    fontWeight: 600,
                  }}
                >
                  {orderSummary.discount || "00"}
                </Typography>
              </Box>
              <hr />
              <Box className="grid grid-cols-3 gap-8">
                <Typography component="span" variant="h6" sx={{ fontSize: 14 }}>
                  Total Amount
                </Typography>
                <Typography
                  component="span"
                  variant="h6"
                  sx={{ fontSize: { xs: 14 } }}
                >
                  :
                </Typography>
                <Typography
                  component="span"
                  variant="h6"
                  sx={{
                    fontSize: { xs: 14 },
                    textAlign: "right",
                    fontWeight: 600,
                  }}
                >
                  {orderSummary.total_amount || "00"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ResponsiveOrderSummery;
