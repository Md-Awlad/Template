import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import Footer from "../../Components/Frontend/Footer";
import ResponsiveOrderSummery from "../../Components/Frontend/ResponsiveOrderSummary";
import { useStateContext } from "../../Contexts/ContextProvider";
import { baseURL } from "../../utils/myAxios";

const OrderSummary = () => {
  const { orderId, expandedMenu } = useStateContext();
  const componentRef = useRef();
  const [orderSummary, setOrderSummary] = React.useState([]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  React.useEffect(() => {
    fetch(`${baseURL}/order_summery/${orderId}/`)
      .then((res) => res.json())
      .then((data) => setOrderSummary(data));
  }, []);

  return (
    <>
      {expandedMenu ? (
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 7,
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
                mt: 5,
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: { xs: "wrap", gap: 10 },
              }}
            >
              {/* --leftDelivery-- */}
              <Box>
                <Typography
                  component="span"
                  variant="h6"
                  className="text-xl font-semibold"
                >
                  Order Details
                </Typography>
                <Box>
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
                    Order Type:{" "}
                    {`${
                      orderSummary?.order_type === "takeaway"
                        ? "Takeaway"
                        : orderSummary?.order_type === "dine_in" && "Dine In"
                    }`}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* --orderSummary-- */}
            <Box>
              <Typography component="span" variant="h6">
                Order Summary
              </Typography>
              <div className="bg-gray-100">
                <div className="bg-white shadow-sm overflow-auto">
                  <table className="w-full overflow-scroll">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                        <th className="px-2 py-3">Item</th>
                        <th className="px-2 py-3">Quantity</th>
                        <th className="px-2 py-3">Extra Ingredient</th>
                        <th className="px-2 py-3">Size</th>
                        <th className="px-2 py-3">Amount</th>
                        <th className="px-2 py-3">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                      {orderSummary.order_items?.map((data) => (
                        <tr
                          key={data.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 text-center">{data.food_name}</td>
                          <td className="py-3 text-center">{data.quantity}</td>
                          <td className="py-3 text-center">
                            <div className="flex justify-evenly items-center h-12 overflow-scroll">
                              <div>
                                {data?.extra?.map((ingredient, index) => (
                                  <h2 key={index}>{ingredient?.name}</h2>
                                ))}
                              </div>
                              <div>
                                {data?.extra?.map((ingredient, index) => (
                                  <h2 key={index}>{ingredient?.price}</h2>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-center">{data.price}</td>
                          <td className="py-3 text-center">
                            {data.food_price}{" "}
                          </td>
                          <td className="py-3 text-center">
                            {data.food_amount}{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <Box
                sx={{ display: "flex", justifyContent: "flex-end", marginY: 5 }}
              >
                <Box>
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
                      sx={{ fontSize: { xs: 14 } }}
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
                      sx={{ fontSize: { xs: 14 } }}
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
                      sx={{ fontSize: { xs: 14 } }}
                    >
                      {orderSummary.discount || "00"}
                    </Typography>
                  </Box>
                  <hr />
                  <Box className="grid grid-cols-3 gap-8">
                    <Typography
                      component="span"
                      variant="h6"
                      sx={{ fontSize: { xs: 14 } }}
                    >
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
                      sx={{ fontSize: { xs: 14 } }}
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
      ) : (
        <ResponsiveOrderSummery />
      )}
    </>
  );
};

export default OrderSummary;
