// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIos";
// import MuiAccordion from "@mui/material/Accordion";
// import MuiAccordionDetails from "@mui/material/AccordionDetails";
// import MuiAccordionSummary from "@mui/material/AccordionSummary";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import * as React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { staticAxios } from "../../../utils/myAxios";
import { CustomModal } from "../../Shared/SharedStyles";
// const style = {
//   // position: "absolute",
//   // top: "50%",
//   // left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "#fff",
//   border: "2px solid #fff",
//   borderRadius: "5px",
//   boxShadow: 24,
//   // zIndex: 5,
//   pt: 2,
//   px: 4,
//   pb: 2,
// };
// const style = {
//   position: "absolute",
//   top: "55%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 600,
//   bgcolor: "background.paper",
//   border: "none",
//   borderRadius: 2,
//   zIndex: 5,
//   boxShadow: 24,
// };
/* Creating a drawer that is 56px wide. */
const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function AddToCartModal(props) {
  const { window, open, setOpen, index, item } = props;
  // const [expanded, setExpanded] = React.useState("panel1");
  const [size, setSize] = React.useState({});
  const { activeMenu, setCart, cart, setIngredientId } = useStateContext();
  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;
  // const handleChange2 = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  const [searchParams] = useSearchParams();

  const handleChange = (checkbox) => {
    setSize({
      ...size,
      [checkbox.index]: checkbox.key,
    });
  };
  const handleAddToCartSingleValue = (param, key) => {
    const item = { ...param, extra: {} };
    setIngredientId(item.category);
    item.sId = Number(Math.round(Math.random() * 100).toFixed(2));

    item.price = key[1];
    item.size = key[0];

    if (cart.find((i) => i.item)) {
      setCart(
        cart?.map((e) => {
          if (e === item) {
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
  const handleAddToCart = (param, index, key) => {
    const item = { ...param, extra: {} };
    setIngredientId(item.category);
    item.price = size[index][1];
    item.sId = Number(Math.round(Math.random() * 100).toFixed(2));
    item.size = size[index][0];

    if (cart.find((i) => i.item)) {
      setCart(
        cart?.map((e) => {
          if (e === item) {
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

  /* Using the useQuery hook to fetch data from the server. */
  const { data: { data: ingredients = [] } = {} } = useQuery(
    [`/customize_food_category/${item.category}`],
    () => staticAxios(`/customize_food_category/${item.category}/`)
  );

  /**
   * If the item is in the cart, increment the count. If not, add it to the cart with a count of 1.
   */
  const handleIncrement = (item) => {
    if (cart.find((i) => i === item && Object.keys(item?.extra))) {
      setCart(
        cart.map((e) => {
          if (e === item && Object.keys(item?.extra)) {
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

  /**
   * If the item is in the cart, then decrement the count of the item in the cart.
   */
  const handleDecrement = (item) => {
    if (cart.find((i) => i === item)) {
      setCart(
        cart.map((e) => {
          if (e === item && e.count > 1) {
            return { ...e, count: e.count - 1 };
          } else {
            return e;
          }
        })
      );
    }
  };
  /**
   * If the item is in the cart, add the extra to the item. If the extra is already in the item, remove
   * it.
   */

  const [orderType, setOrderType] = useState(
    searchParams.get("table") ? "dine_in" : "takeaway"
  );
  const addExtra = (extraId, price = 0) => {
    setCart(
      cart.map((e) => {
        //e.id === item.id && e.size === item.size
        if (e === item) {
          const existing = e?.extra && Boolean(e.extra[extraId]);

          if (Object.keys(e.extra).length) {
            Object.keys(e.extra).map((ex) => {
              if (parseInt(ex) === extraId) {
                delete e.extra[extraId];
              } else {
                e["extra"] = {
                  ...e?.extra,
                  [extraId]: price,
                };
              }
            });
          } else {
            e["extra"] = {
              [extraId]: price,
            };
          }
          return e;
        } else {
          return e;
        }
      })
    );
  };
  const handleType = (e) => {
    setOrderType(
      e.target.innerText.toLowerCase() === "dine in"
        ? "dine_in"
        : e.target.innerText.toLowerCase()
    );
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
    <CustomModal open={open} onClose={() => setOpen(false)}>
      <Box className="">
        <Box>
          <img
            src={item?.image}
            className="w-full  h-56 object-cover rounded-t-lg"
            alt=""
          />
        </Box>
        <Box className="p-4">
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: 26 }}>
              {item?.food_name}
            </Typography>
            <Typography
              sx={{
                mb: 2,
              }}
              className="text-gray-600 "
            >
              {item?.base_ingredient}
            </Typography>
            <Divider sx={{ mY: 2 }} />
          </Box>
          <Stack>
            {/* ---variation--- */}
            <Box>
              <Box className="flex justify-between my-5 lowercase">
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                >
                  select variation
                </Typography>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: 14,
                    fontWeight: 500,
                    px: 1,
                  }}
                  className="text-gray-400 bg-gray-100 rounded-md flex items-center"
                >
                  1 required
                </Typography>
              </Box>

              <FormControl fullWidth>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  sx={{
                    width: 1,
                  }}
                >
                  {Boolean(item?.discount_price)
                    ? Object.entries(item?.discount_price).map((key) => (
                        <Box
                          sx={{
                            width: 1,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          {/* CHECK BUTTON */}
                          <Box className="flex items-center">
                            <FormControlLabel
                              sx={{
                                "&.MuiFormControlLabel-root": {
                                  mr: 0,
                                  pl:
                                    Object.values(item?.discount_price).length <
                                    2
                                      ? 2
                                      : 0,
                                },
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              control={
                                <Radio
                                  size={activeMenu ? "small" : "medium"}
                                  style={{
                                    color: "#F0A70B",
                                    display:
                                      Object.values(item?.discount_price)
                                        .length < 2
                                        ? "none"
                                        : "block",
                                  }}
                                />
                              }
                              name="size"
                              value={key[1]}
                              onChange={(e) => handleChange({ index, key })}
                            />
                            <Typography
                              sx={{
                                fontSize: {
                                  sm: "12px",
                                  md: "16px",
                                },
                                // pl: 2,
                              }}
                            >
                              {key[0] ? key[0] : "Price:"}
                            </Typography>
                          </Box>
                          {/* Price  */}

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                            variant="h6"
                          >
                            <Typography
                              className="text-gray-600"
                              sx={{
                                fontSize: {
                                  sm: "12px",
                                },
                                textDecoration: "line-through",
                              }}
                            >
                              TK {item.price[key[0]]}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: 300,
                                fontSize: {
                                  sm: "16px",
                                },
                                mr: 1,
                              }}
                            >
                              TK {key[1]}
                            </Typography>
                          </Box>
                        </Box>
                      ))
                    : Object.entries(item?.price).map((key) => {
                        return (
                          <Box className="flex items-center justify-between">
                            <Box className="flex items-center">
                              <FormControlLabel
                                sx={{
                                  "&.MuiFormControlLabel-root": {
                                    mr: 0,
                                    pl:
                                      Object.values(item?.price).length < 2
                                        ? 2
                                        : 0,
                                  },
                                }}
                                control={
                                  <Radio
                                    style={{
                                      color: "#FFC446",
                                      display:
                                        Object.values(item?.price).length < 2
                                          ? "none"
                                          : "block",
                                    }}
                                  />
                                }
                                name="size"
                                value={key[1]}
                                onClick={(e) => handleChange({ index, key })}
                              />
                              <Typography
                                sx={{
                                  fontSize: {
                                    sm: "12px",
                                    md: "16px",
                                  },
                                  // pl: 2,
                                }}
                                // variant="h6"
                              >{`${
                                key[0] ? key[0].replace("inch", '"') : "price"
                              }`}</Typography>
                            </Box>
                            <Box className="flex  items-center">
                              <Typography
                                sx={{
                                  fontWeight: 300,
                                  fontSize: {
                                    sm: "16px",
                                  },
                                  mr: 1,
                                }}
                              >
                                TK {key[1]}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                </RadioGroup>
              </FormControl>
            </Box>
            {/*add extra ingredient */}
            {/* {Boolean(ingredients?.length > 0) && (
                <Box className="flex justify-between my-5 ">
                  <Box>
                    <Typography
                      sx={{
                        textTransform: "lowercase",
                        fontSize: 18,
                        fontWeight: 500,
                      }}
                    >
                      Extra ingredient
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 300,
                      }}
                    >
                      Add what you like
                    </Typography>
                    <Accordion
                      sx={{
                        bgcolor: "unset",
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
                        <Typography
                          sx={{
                            fontWeight: "semibold",
                            fontSize: { md: 16, xs: 20 },
                          }}
                        >
                          Extra Ingredients
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {ingredients?.map((extraPrice, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: { xs: "wrap", gap: 1 },
                              }}
                            >
                              <Box>
                                <FormControlLabel
                                  sx={{ "& .MuiCheckbox-root": { padding: 1 } }}
                                  control={
                                    <Checkbox
                                      style={{
                                        color: "#F0A70B",
                                      }}
                                    />
                                  }
                                  label={extraPrice.ingredient_name}
                                  name="size"
                                  value={
                                    item?.extra
                                      ? Boolean(item?.extra[extraPrice?.id])
                                      : false
                                  }
                                  onChange={() =>
                                    addExtra(extraPrice.id, extraPrice.price)
                                  }
                                />
                              </Box>
                              <Typography
                                variant="h6"
                                sx={{ fontSize: "14px" }}
                              >
                                {extraPrice.price} 
                              </Typography>
                            </Box>
                          ))}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Box>

                  <Typography
                    sx={{
                      height: 28,
                      textTransform: "uppercase",
                      fontSize: 14,
                      fontWeight: 500,
                      px: 1,
                    }}
                    className="text-gray-400 bg-gray-100 rounded-md flex items-center"
                  >
                    optional
                  </Typography>
                </Box>
              )} */}

            {/* Add to Cart Section */}
            <Box
              className="my-5"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* increment and decrement */}
              {/* {Boolean(Object.entries(size).length) && ( */}
              {/* <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Button
                    disabled={!Boolean(Object.entries(size).length)}
                    sx={{
                      "&.MuiButton-root": {
                        minWidth: 0,
                        minHight: 0,
                        padding: 0,
                      },
                    }}
                    onClick={() => handleDecrement(item)}
                  >
                    <AiOutlineMinus className="inline text-xl  cursor-pointer" />
                  </Button>
                  <Typography className="text-xl text-gray-600">
                    {item?.count}
                  </Typography>
                  <Button
                    disabled={!Boolean(Object.entries(size).length)}
                    sx={{
                      "&.MuiButton-root": {
                        minWidth: 0,
                        minHight: 0,
                        padding: 0,
                      },
                    }}
                    onClick={() => handleIncrement(item)}
                  >
                    <GrAdd className="inline text-xl    cursor-pointer" />
                  </Button>
                </Box> */}
              {/* )} */}

              {/* Add To Cart Button */}
              <Box
                sx={{
                  width: "80%",
                }}
              >
                {Boolean(item?.discount_price) ? (
                  <Box sx={{ width: 1 }}>
                    {Object.values(item?.discount_price).length < 2 ? (
                      Object.entries(item?.discount_price).map((key, i) => {
                        return (
                          <Button
                            key={i}
                            variant="contained"
                            sx={{
                              width: 1,
                              cursor: "pointer",
                              display:
                                Object.values(item?.discount_price).length > 1
                                  ? "none"
                                  : "block",
                            }}
                            // className={`border bg-yellow-600  inline-block px-2   cursor-pointer rounded-md

                            //   `}
                            onClick={(e) => {
                              handleAddToCartSingleValue(item, key);
                            }}
                          >
                            Add To Cart
                          </Button>
                        );
                      })
                    ) : (
                      <Button
                        variant="contained"
                        sx={{
                          width: 1,

                          cursor: "pointer",
                          display:
                            Object.values(item?.discount_price).length > 1
                              ? "block"
                              : "none",
                        }}
                        // className={`bg-yellow-600   inline-block   cursor-pointer rounded-md ${
                        //   activeMenu ? "left-[500px]" : "left-[300px]"
                        // }`}
                        onClick={(e) => {
                          handleAddToCart(item, index);
                        }}
                      >
                        Add To cart
                      </Button>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ width: 1 }}>
                    {Object.values(item?.price).length < 2 ? (
                      Object.entries(item?.price).map((key, i) => {
                        return (
                          <Button
                            key={i}
                            variant="contained"
                            sx={{
                              width: 1,
                              cursor: "pointer",
                              display:
                                Object.values(item?.price).length > 1
                                  ? "none"
                                  : "block",
                            }}
                            // className={`  inline-block cursor-pointer rounded-md ${
                            //   activeMenu ? "left-[500px]" : "left-[300px]"
                            // }`}
                            onClick={(e) => {
                              handleAddToCartSingleValue(item, key);
                            }}
                          >
                            {" "}
                            Add To Cart
                          </Button>
                        );
                      })
                    ) : (
                      <Button
                        variant="contained"
                        sx={{
                          width: 1,

                          cursor: "pointer",
                          display:
                            Object.values(item?.price).length > 1
                              ? "block"
                              : "none",
                        }}
                        // className={`border border-[#F0A70B] text-[#F0A70B]  inline-block w-10 h-10 md:w-8 md:h-8 cursor-pointer rounded-md ${
                        //   activeMenu ? "left-[500px]" : "left-[300px]"
                        // }`}
                        onClick={(e) => {
                          handleAddToCart(item, index);
                        }}
                      >
                        Add To Cart{" "}
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </CustomModal>
  );
}

AddToCartModal.propTypes = {
  window: PropTypes.func,
};

export default AddToCartModal;
