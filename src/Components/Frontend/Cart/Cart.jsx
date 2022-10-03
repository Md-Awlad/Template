import {
  Alert,
  Badge,
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useStateContext } from "../../../Contexts/ContextProvider";
import interceptor from "../../../utils/interceptors";
import CartItems from "./CartItems";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { staticAxios } from "../../../utils/myAxios";
import { AiOutlineArrowLeft } from "react-icons/ai";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Cart = () => {
  const { setOrderId } = useStateContext();
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [orderType, setOrderType] = useState("dine_in");
  const { cart, setCart } = useStateContext();
  const { register, handleSubmit, reset, control } = useForm();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleType = (e) => {
    setOrderType(
      e.target.innerText.toLowerCase() === "dine in"
        ? "dine_in"
        : e.target.innerText.toLowerCase()
    );
  };

  // const {
  //   data: { data: ingredients = [] },
  // } = useQuery([`/customize_food_category/${item.category}`], () =>
  //   staticAxios(`/customize_food_category/${item.category}`)
  // );
  // const { data: total = [] } = staticAxios("/viewcart/");
  // console.log(total);

  const orderConfirmMutation = useMutation(
    (payload) =>
      interceptor.post(
        `/order/?table=${
          searchParams.get("table") ? searchParams.get("table") : []
        }`,
        payload
      ),
    {
      onSuccess: ({ data }) => {
        setCart([]);
        reset();
        navigate("/ordersummary");
        setOrderId(data?.id);
      },
    }
  );
  const onSubmit = async (data) => {
    const payload = {
      order_type: orderType,
      order_items: cart?.map((item) => {
        return {
          id: item.id,
          quantity: item.count,
          price: item.size,
          extra: item?.extra ? Object.keys(item?.extra) : [],
        };
      }),
      name: data?.name,
      email: data?.email,
      phone: data?.phoneNumber,
      address: data?.address,
    };
    orderConfirmMutation.mutate(payload);
  };

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

            extra: item.extra
              ? Object.keys(item?.extra)
              : []
              ? item.extra
                ? Object.keys(item?.extra)
                : []
              : 0,
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
        mt: { md: 0, sm: 7, xs: 9 },
      }}
    >
      {/* --cartInfo-- */}
      <Box
        sx={{
          "& .MuiBox-root": { padding: 0 },
          color: "#000",
          borderColor: "#a8adaa",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
            your food
          </Typography>
          <Badge
            className="cursor-pointer"
            badgeContent={cart.length}
            color="primary"
          >
            <MdOutlineAddShoppingCart
              className="inline w-6 h-6 cursor-pointer"
              color="action"
            />
          </Badge>
        </Box>
        <Box sx={{ height: "60vh", overflow: "scroll" }}>
          {cart?.map((item, index) => (
            <CartItems key={index} item={item} cart={cart} setCart={setCart} />
          ))}
        </Box>
      </Box>
      {/* --submitInfo-- */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ marginY: 2 }}>
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
                  {cartCalculation?.sub_total
                    ? cartCalculation?.sub_total
                    : "00"}{" "}
                  <span>Tk</span>
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
                  {cartCalculation?.packaging
                    ? cartCalculation?.packaging
                    : "00"}{" "}
                  <span>Tk</span>
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
                  <span>Tk</span>
                </Typography>
              </Box>
              <hr className="border-[#FFC446]" />
              {/* --total-- */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  Total Amount
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  {cartCalculation?.total_amount
                    ? cartCalculation?.total_amount
                    : "00"}{" "}
                  <span>Tk</span>
                </Typography>
              </Box>
              <hr className="border-[#FFC446]" />
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#FFC446",
                    },
                    "& button": {
                      color: "#000",
                      borderRadius: "5px 5px 0 0 ",
                      paddingX: 3,
                    },
                    "& button.Mui-selected": {
                      backgroundColor: "#FFC446",
                      color: "#000",
                    },
                  }}
                >
                  <Tab onClick={handleType} label="Dine In" {...a11yProps(0)} />
                  <Tab
                    onClick={handleType}
                    label="Takeaway"
                    {...a11yProps(1)}
                  />
                </Tabs>
                {/* --dineIn-- */}
                <TabPanel value={value} index={0}>
                  <Box className="space-y-2">
                    {" "}
                    <TextField
                      size="small"
                      label="Your Email"
                      type="email"
                      {...register("email")}
                      fullWidth
                    />
                    <Controller
                      name="phoneNumber"
                      control={control}
                      defaultValue="+880"
                      rules={{ validate: matchIsValidTel }}
                      render={({ field, fieldState }) => (
                        <MuiTelInput
                          {...field}
                          fullWidth
                          preferredCountries={["BD"]}
                          helperText={
                            Boolean(fieldState.error)
                              ? "Phone Number is Invalid"
                              : ""
                          }
                          error={Boolean(fieldState.error)}
                        />
                      )}
                    />
                  </Box>
                </TabPanel>
                {/* --takeaway-- */}
                <TabPanel value={value} index={1}>
                  <Box className="space-y-2">
                    <TextField
                      size="small"
                      label="Your Name"
                      type="text"
                      {...register("name")}
                      fullWidth
                    />
                    <TextField
                      size="small"
                      label="Your Email"
                      type="email"
                      {...register("email")}
                      fullWidth
                    />
                    <Controller
                      name="phoneNumber"
                      control={control}
                      defaultValue="+880"
                      rules={{ validate: matchIsValidTel }}
                      render={({ field, fieldState }) => (
                        <MuiTelInput
                          {...field}
                          fullWidth
                          preferredCountries={["BD"]}
                          helperText={
                            Boolean(fieldState.error)
                              ? "Phone Number is Invalid"
                              : ""
                          }
                          error={Boolean(fieldState.error)}
                        />
                      )}
                    />
                  </Box>
                </TabPanel>
              </Box>
            </Box>
            <Button
              type="submit"
              variant="outlined"
              sx={{
                ":hover": {
                  borderColor: "#FFC446",
                },
                width: "100%",
                height: { md: 35, xs: 50 },
                backgroundColor: "#FFC446",
                borderColor: "#FFC446",
                color: "#000",
                borderRadius: "20px",
                fontSize: { xs: 17, md: 14 },
              }}
            >
              Confirm Your Order
            </Button>
            {orderConfirmMutation.isSuccess ? (
              <Alert severity="success">Your Order Successfully Done!</Alert>
            ) : null}
            {Boolean(orderConfirmMutation.error) ? (
              <Alert severity="error">
                {orderConfirmMutation.error?.response?.data?.detail ??
                  "There was an error"}
              </Alert>
            ) : null}
          </Box>
        </Box>
      </form>
      <Link to="/">
        <Button
          sx={{
            display: { md: "none" },
            fontSize: "12px",
          }}
        >
          <AiOutlineArrowLeft />
          Go back
        </Button>
      </Link>
    </Box>
  );
};

export default Cart;
