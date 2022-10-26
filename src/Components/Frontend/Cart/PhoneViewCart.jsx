import {
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {  useQuery } from "@tanstack/react-query";
import { useStateContext } from "../../../Contexts/ContextProvider";
import CartItems from "./CartItems";
import {  useSearchParams } from "react-router-dom";
import { staticAxios } from "../../../utils/myAxios";

const PhoneViewCart = () => {
  let [searchParams] = useSearchParams();
  const [orderType, setOrderType] = useState(
    searchParams.get("table") ? "dine_in" : "takeaway"
  );
  const { cart, setCart } = useStateContext();

  const { data: cartCalculation } = useQuery(
    ["viewcart", cart],
    async () => {
      const { data } = await staticAxios.post("/viewcart/", {
        order_type: orderType,
        order_items: cart?.map((item) => {
          return {
            id: item.id,
            quantity: item.count,
            price: item.size,
            // extra: item?.extra ? Object.keys(item?.extra) : [],
            extra: item.extra ? Object.keys(item?.extra) : [],
          };
        }),
      });
      return data;
    },
    {
      enabled: Boolean(cart.length),
    }
  );

  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 2,
        border: "1px solid #ccc",
        borderRadius: "5px",
        mt: { md: 0, sm: 7, xs: 0 },
      }}
    >
      {/* --cartInfo-- */}

      <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
        your food
      </Typography>

      <Box sx={{ height: "60vh", overflow: "scroll" }}>
        {cart?.map((item, index) => (
          <CartItems key={index} item={item} cart={cart} setCart={setCart} />
        ))}
      </Box>

      <Box sx={{ mt: 2,mb:10 }}>
        <Box className="space-y-4">
          <Box className="space-y-3">
            {/* --subTotal-- */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "14px" }}>
                Sub Total
              </Typography>
              <Typography variant="h6" sx={{ fontSize: "14px" }}>
                {cartCalculation?.sub_total ? cartCalculation?.sub_total : "00"}{" "}
                <span>৳</span>
              </Typography>
            </Box>
            {/* --package-- */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "14px" }}>
                Packaging
              </Typography>
              <Typography variant="h6" sx={{ fontSize: "14px" }}>
                {cartCalculation?.packaging ? cartCalculation?.packaging : "00"}{" "}
                <span>৳</span>
              </Typography>
            </Box>
            {/* --discount-- */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "14px" }}>
                Discount
              </Typography>
              <Typography variant="h6" sx={{ fontSize: "14px" }}>
                {cartCalculation?.discount_amount
                  ? -cartCalculation?.discount_amount
                  : "00"}{" "}
                <span>৳</span>
              </Typography>
            </Box>
            <hr className="border-[#F0A70B]" />
            {/* --total-- */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb:10
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "16px" }}>
                Total Amount
              </Typography>
              <Typography variant="h6" sx={{ fontSize: "16px" }}>
                {cartCalculation?.total_amount
                  ? cartCalculation?.total_amount
                  : "00"}{" "}
                <span>৳</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PhoneViewCart;
