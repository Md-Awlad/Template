import {
  Alert,
  Badge,
  Box,
  Button,
  Divider,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiShoppingBag } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStateContext } from "../../../Contexts/ContextProvider";
import interceptor from "../../../utils/interceptors";
import {
  setGmailInfo,
  setOrderInfo,
  setPhoneInfo,
} from "../../../utils/localStorages";
import { staticAxios } from "../../../utils/myAxios";
import CartItems from "./CartItems";

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
  const { setOrderId, activeMenu } = useStateContext();
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [orderType, setOrderType] = useState(
    searchParams.get("table") ? "dine_in" : "takeaway"
  );
  const { cart, setCart } = useStateContext();
  const { register, handleSubmit, reset, control } = useForm();

  // const { data: orderSummary = [] } = useQuery(["orderSummary"], async () => {
  //   const res = await staticAxios(`/order_summery/`);
  //   return res.data;
  // });
  // console.log(orderSummary);

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
        setOrderInfo(data?.id);
        setPhoneInfo(data?.phone);
        setGmailInfo(data?.email);
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
    };
    orderConfirmMutation.mutate(payload);
    console.log(payload);
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

      {activeMenu ? (
        <Box className="flex justify-between">
          <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
            your food
          </Typography>
          <Divider className="border-2" />
          <Badge
            className="cursor-pointer"
            badgeContent={cart.length}
            color="primary"
          >
            <BiShoppingBag
              className="inline text-2xl cursor-pointer"
              color="action"
            />
          </Badge>
        </Box>
      ) : null}
      <Box
        sx={{
          maxHeight: Boolean(cart?.length) ? "60vh" : "10vh",
          overflow: "scroll",
        }}
      >
        {cart?.map((item, index) => (
          <CartItems key={index} item={item} cart={cart} setCart={setCart} />
        ))}
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
                  {cartCalculation?.packaging
                    ? cartCalculation?.packaging
                    : "00"}{" "}
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
              <hr className="border-[#F0A70B]" />
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
                      backgroundColor: "#F0A70B",
                    },
                    "& button": {
                      color: "#000",
                      borderRadius: "5px 5px 0 0 ",
                      paddingX: 3,
                    },
                    "& button.Mui-selected": {
                      backgroundColor: "#F0A70B",
                      color: "#000",
                    },
                  }}
                >
                  {searchParams.get("table") ? (
                    <Tab
                      onClick={handleType}
                      label="Dine In"
                      {...a11yProps(0)}
                    />
                  ) : null}

                  {searchParams.get("table") ? (
                    <Tab
                      onClick={handleType}
                      label="Takeaway"
                      {...a11yProps(1)}
                    />
                  ) : (
                    <Tab
                      onClick={handleType}
                      label="Takeaway"
                      {...a11yProps(0)}
                    />
                  )}
                </Tabs>
                {/* --dineIn-- */}

                {searchParams.get("table") ? (
                  <TabPanel value={value} index={0}>
                    <Box className="space-y-2">
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
                ) : null}

                {/* --takeaway-- */}
                {searchParams.get("table") ? (
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
                ) : (
                  <TabPanel value={value} index={0}>
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
                )}
              </Box>
            </Box>
            <Button
              type="submit"
              variant="outlined"
              sx={{
                ":hover": {
                  borderColor: "#F0A70B",
                },
                width: "100%",
                height: { md: 35, xs: 50 },
                backgroundColor: "#F0A70B",
                borderColor: "#F0A70B",
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
      {/* <Link to="/">
        <button className="flex items-center m-auto border border-gray-500 rounded-md px-2">
          <AiOutlineArrowLeft />
          Go back
        </button>
      </Link> */}
    </Box>
  );
};

export default Cart;
