import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Badge,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../../Contexts/ContextProvider";
import interceptor from "../../../utils/interceptors";

const Cart = () => {
  const { cart, setCart } = useStateContext();
  const [fieldShow, setFieldShow] = useState(false);
  const [packaging, setPackaging] = useState(10);
  const [extraOne, setExtraOne] = useState(null);
  const [extraTwo, setExtraTwo] = useState(null);
  const [extraThree, setExtraThree] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleExtraPrice = (item, data) => {
    if (cart.find((i) => i.id === item.id && i.size === item.size)) {
      setCart(
        cart.map((e) => {
          if (e.id === item.id && e.size === item.size && data === "one") {
            return { ...e, extraOne: e.extraOne ? false : true };
          }
          if (e.id === item.id && e.size === item.size && data === "two") {
            return { ...e, extraTwo: e.extraTwo ? false : true };
          }
          if (e.id === item.id && e.size === item.size && data === "three") {
            return { ...e, extraThree: e.extraThree ? false : true };
          } else {
            return e;
          }
        })
      );
    }
  };

  const handleIncrement = (item) => {
    if (cart.find((i) => i.id === item.id && i.size === item.size)) {
      setCart(
        cart.map((e) => {
          if (e.id === item.id && e.size === item.size) {
            return { ...e, count: e.count + 1 };
          } else {
            return e;
          }
        })
      );
    } else {
      setCart([...cart, { ...item, count: 1 }]);
    }
  };

  const handleDecrement = (item) => {
    if (cart.find((i) => i.id === item.id && i.size === item.size)) {
      setCart(
        cart.map((e) => {
          if (e.id === item.id && e.size === item.size && e.count > 1) {
            return { ...e, count: e.count - 1 };
          } else {
            return e;
          }
        })
      );
    }
  };

  const orderConfirmMutation = useMutation(
    (payload) => interceptor.post("/order/", payload),
    {
      onSuccess: () => {
        setCart([]);
      },
    }
  );

  const onSubmit = async (data) => {
    console.log(data);
    const payload = {
      order_type: "takeaway",
      order_items: cart.map((item) => {
        return {
          id: item.id,
          quantity: item.count,
          price: item.size,
        };
      }),
      name: data?.name,
      phone: data?.phone,
    };
    orderConfirmMutation.mutate(payload);
    console.log(payload);
  };

  // --remove item--
  const removeItem = (id) => {
    const deleted = cart.filter((item) => item.id !== id && item.size !== id);
    setCart(deleted);
  };

  return (
    <div className="border rounded-md py-2">
      <div className="h-96 overflow-y-scroll">
        <Box
          sx={{
            "& .MuiBox-root": { padding: 0 },
            color: "#000",
            borderColor: "#a8adaa",
            borderRadius: 1,
          }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold px-2 pb-3 capitalize">
              your food
            </h2>
            <Badge
              className="mr-3 cursor-pointer"
              badgeContent={cart.length}
              color="primary"
            >
              <MdOutlineAddShoppingCart
                className="inline w-6 h-6 cursor-pointer"
                color="action"
              />
            </Badge>
          </div>
          {cart.map((item) => (
            <Paper
              sx={{
                marginX: 1,
                marginY: 1,
                padding: 2,
                boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 20%)",
              }}
            >
              <div className="flex items-center gap-3 md:flex-nowrap flex-wrap relative">
                <img
                  className="w-16 h-16 object-contain"
                  src={item.image}
                  alt=""
                />
                <div>
                  <h2 className="text-xl font-bold">{item.food_name}</h2>
                  <div className="flex gap-3">
                    <h3 className="text-sm font-bold">Size: {item?.size}</h3>
                  </div>
                </div>
                {/* --remove-- */}
                <MdClose
                  onClick={() => removeItem(item.id && item.size)}
                  className="absolute -right-2 -top-2 cursor-pointer text-red-600 text-lg border border-gray-700 rounded-full"
                />
              </div>
              {/* --countBtn-- */}
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <AiOutlineMinus
                    onClick={() => handleDecrement(item)}
                    className="inline w-5 h-5 border border-gray-600 rounded cursor-pointer"
                  />
                  <p>{item?.count}</p>
                  <GrAdd
                    onClick={() => handleIncrement(item)}
                    className="inline w-5 h-5 border border-gray-600 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">
                    {item?.price
                      ? Number(
                          item?.price * item?.count +
                            Number(item?.extraOne ? 20 : 0) +
                            Number(item?.extraTwo ? 15 : 0) +
                            Number(item?.extraThree ? 10 : 0)
                        )
                      : 0}
                    <span className="text-lg font-semibold pl-1">Tk</span>
                  </h3>
                </div>
              </div>
              {/* --extra-- */}
              <Accordion
                sx={{
                  "& .MuiAccordionSummary-root": {
                    padding: "0 !important",
                  },
                  "& .MuiAccordionDetails-root": {
                    padding: 0,
                  },
                  boxShadow: "none",
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                    Extra Ingredients
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <div>
                        <FormControlLabel
                          sx={{ "& .MuiCheckbox-root": { padding: 1 } }}
                          control={
                            <Checkbox
                              style={{
                                color: "#FFC446",
                              }}
                            />
                          }
                          label="Cheese"
                          name="size"
                          value={extraOne}
                          onClick={() => handleExtraPrice(item, "one")}
                        />
                      </div>
                      <h2 className="text-md font-semibold pl-1">20 Tk</h2>
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <div>
                        <FormControlLabel
                          sx={{ "& .MuiCheckbox-root": { padding: 1 } }}
                          control={
                            <Checkbox
                              style={{
                                color: "#FFC446",
                              }}
                            />
                          }
                          label="Salad"
                          name="size"
                          value={extraTwo}
                          onClick={() => handleExtraPrice(item, "two")}
                        />
                      </div>
                      <h2 className="text-md font-semibold pl-1">15 Tk</h2>
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <div>
                        <FormControlLabel
                          sx={{ "& .MuiCheckbox-root": { padding: 1 } }}
                          control={
                            <Checkbox
                              style={{
                                color: "#FFC446",
                              }}
                            />
                          }
                          label="Sauce"
                          name="size"
                          value={extraThree}
                          onClick={() => handleExtraPrice(item, "three")}
                        />
                      </div>
                      <h2 className="text-md font-semibold pl-1">10 Tk</h2>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          ))}
        </Box>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-8 mx-2">
          <div className="space-y-4">
            <div className="flex gap-12">
              <Button
                variant="outlined"
                sx={{
                  ":hover": {
                    backgroundColor: "#FFC446",
                    borderColor: "#FFC446",
                  },
                  width: 130,
                  height: 30,
                  color: "#000",
                  borderColor: "#000",
                }}
              >
                <h3>Dine-in</h3>
              </Button>
              <Button
                onClick={() => setFieldShow(!fieldShow)}
                variant="outlined"
                sx={{
                  ":hover": {
                    backgroundColor: "#FFC446",
                    borderColor: "#FFC446",
                  },
                  width: 130,
                  height: 30,
                  color: "#000",
                  borderColor: "#000",
                }}
              >
                <h3>Takeway</h3>
              </Button>
            </div>
            {fieldShow ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: 2,
                }}
              >
                <TextField
                  size="small"
                  label="Your Name"
                  type="text"
                  error={Boolean(errors.name)}
                  helperText={errors.name && "This name is required*"}
                  {...register("name", { required: true })}
                  fullWidth
                  required
                />
                <TextField
                  size="small"
                  label="Your Phone Number"
                  type="number"
                  error={Boolean(errors.phone)}
                  helperText={errors.phone && "This number is required*"}
                  {...register("phone", { required: true })}
                  fullWidth
                  required
                />
              </Box>
            ) : null}

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-bold text-gray-700">Packaging</h2>
                <h3 className="text-2xl font-semibold">
                  {packaging}
                  <span className="text-lg font-semibold pl-1">Tk</span>
                </h3>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-700">
                  Total Amount
                </h2>
                <h3 className="text-2xl font-semibold">
                  {Boolean(cart.length)
                    ? cart
                        .map(
                          (item) =>
                            item?.count * item?.price +
                            (item?.extraOne ? 20 : 0) +
                            (item?.extraTwo ? 15 : 0) +
                            (item?.extraThree ? 10 : 0)
                        )
                        .reduce((a, b) => a + b, 0) + packaging
                    : 0}

                  <span className="text-lg font-semibold pl-1">Tk</span>
                </h3>
              </div>
            </div>
            <Button
              type="submit"
              variant="outlined"
              sx={{
                ":hover": {
                  borderColor: "#FFC446",
                },
                width: "100%",
                height: 35,
                backgroundColor: "#FFC446",
                borderColor: "#FFC446",
                color: "#000",
                borderRadius: "20px",
              }}
            >
              confirm your order
            </Button>
            {orderConfirmMutation.isSuccess ? (
              <Alert severity="success">Your Order Successfully Done!</Alert>
            ) : null}
            {orderConfirmMutation.isError ? (
              <Alert severity="error">Your Order error..!</Alert>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Cart;
