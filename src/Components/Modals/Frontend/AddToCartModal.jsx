// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIos";
// import MuiAccordion from "@mui/material/Accordion";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import * as React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { CustomModal } from "../../Shared/SharedStyles";
function AddToCartModal(props) {
  const { open, setOpen, index, item } = props;
  // const [expanded, setExpanded] = React.useState("panel1");
  const [size, setSize] = React.useState({});
  console.log(!Boolean(Object.entries(size).length));
  const { activeMenu, setCart, cart, setIngredientId } = useStateContext();
  // This is used only for the example
  const handleChange = (checkbox) => {
    setSize({
      ...size,
      [checkbox.index]: checkbox.key,
    });
  };
  // console.log(!Boolean(Object.entries(size).length));
  const handleAddToCartSingleValue = (param, key) => {
    setOpen(false);
    const item = { ...param, extra: {} };
    setIngredientId(item.category);
    function broofa() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : r & 0x3 || 0x8;
          return v.toString(16);
        }
      );
    }

    // item.sId = Number(Math.round(Math.random() * 100).toFixed(20));
    item.sId = broofa();

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
    setOpen(false);
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
  /**
   * If the item is in the cart, increment the count. If not, add it to the cart with a count of 1.
   */

  return (
    <CustomModal open={open} onClose={setOpen}>
      <Box className="relative">
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "white",
            opacity: 0.7,
          }}
          onClick={setOpen}
        >
          <MdOutlineCancel className="text-gray-800 hover:text-white" />
        </IconButton>
        <Box>
          <img
            src={item?.image}
            className="w-full  h-56 object-cover rounded-t-lg  "
            alt=""
          />
        </Box>
        <Box className="p-4">
          <Box>
            <Box className="flex justify-between items-center">
              <Typography sx={{ fontWeight: 500, fontSize: 26 }}>
                {item?.food_name}
              </Typography>
              <Box>
                {Boolean(item?.discount_price)
                  ? Object.entries(item?.discount_price).map((key, index) => (
                      <Stack>
                        {index === 0 && (
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
                        )}
                      </Stack>
                    ))
                  : Boolean(item?.price)
                  ? Object.entries(item?.price).map((key, index) => {
                      return (
                        <Stack>
                          {index === 0 && (
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
                          )}
                        </Stack>
                      );
                    })
                  : "no data"}
              </Box>
            </Box>

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
            {Boolean(item?.discount_price) ? (
              <Box>
                <Box className="flex justify-between my-5 lowercase">
                  <Typography
                    sx={{
                      display:
                        Object.values(item?.discount_price).length < 2
                          ? "none"
                          : "block",
                      fontSize: 18,
                      fontWeight: 500,
                    }}
                  >
                    select variation
                  </Typography>
                  <Typography
                    sx={{
                      display:
                        Object.values(item?.discount_price).length < 2
                          ? "none"
                          : "block",
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

                <FormControl
                  sx={{
                    display:
                      Object.values(item?.discount_price).length < 2
                        ? "none"
                        : "block",
                  }}
                  fullWidth
                >
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    sx={{
                      width: 1,
                    }}
                  >
                    {Object.entries(item?.discount_price).map((key) => {
                      return (
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
                              TK {item.discount_price[key[0]]}
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
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </Box>
            ) : Boolean(item?.price) ? (
              <Box>
                <Box className="flex justify-between my-5 lowercase">
                  <Typography
                    sx={{
                      display:
                        Object.values(item?.price).length < 2
                          ? "none"
                          : "block",
                      fontSize: 18,
                      fontWeight: 500,
                    }}
                  >
                    select variation
                  </Typography>
                  <Typography
                    sx={{
                      display:
                        Object.values(item?.price).length < 2
                          ? "none"
                          : "block",
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

                <FormControl
                  sx={{
                    display:
                      Object.values(item?.price).length < 2 ? "none" : "block",
                  }}
                  fullWidth
                >
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    sx={{
                      width: 1,
                    }}
                  >
                    {Object.entries(item?.price).map((key) => {
                      return (
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
                                    Object.values(item?.price).length < 2
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
                                      Object.values(item?.price).length < 2
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
                            {/* <Typography
                              className="text-gray-600"
                              sx={{
                                fontSize: {
                                  sm: "12px",
                                },
                                textDecoration: "line-through",
                              }}
                            >
                              TK {item.price[key[0]]}
                            </Typography> */}
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
            ) : (
              ""
            )}
            {/* Add to Cart Section */}
            <Box
              className="my-5"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
                        console.log(item?.discount_price);
                        return (
                          <Button
                            disabled={
                              !Boolean(
                                Object.entries(item?.discount_price).length < 2
                              )
                            }
                            key={i}
                            variant="contained"
                            sx={{
                              width: 1,
                              cursor: "pointer",
                              // display:
                              //   Object.values(item?.discount_price).length > 1
                              //     ? "none"
                              //     : "block",
                            }}
                            onClick={(e) => {
                              console.log(e);
                              handleAddToCartSingleValue(item, key);
                            }}
                          >
                            Add To Cart
                          </Button>
                        );
                      })
                    ) : (
                      <Button
                        disabled={
                          !Boolean(Object.entries(size).length) &&
                          Boolean(
                            Object.entries(item?.discount_price).length > 2
                          )
                        }
                        variant="contained"
                        sx={{
                          width: 1,

                          cursor: "pointer",
                          display:
                            Object.values(item?.discount_price).length > 1
                              ? "block"
                              : "none",
                        }}
                        onClick={(e) => {
                          console.log(e);
                          handleAddToCart(item, index);
                        }}
                      >
                        Add To cart
                      </Button>
                    )}
                  </Box>
                ) : Boolean(item?.price) ? (
                  <Box sx={{ width: 1 }}>
                    {Object.values(item?.price).length < 2 ? (
                      Object.entries(item?.price).map((key, i) => {
                        console.log(item?.price);
                        return (
                          <Button
                            disabled={
                              !Boolean(Object.entries(item?.price).length < 2)
                            }
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
                            onClick={(e) => {
                              console.log(e);
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
                        disabled={
                          !Boolean(Object.entries(size).length) &&
                          Boolean(Object.entries(item?.price).length > 2)
                        }
                        variant="contained"
                        sx={{
                          width: 1,

                          cursor: "pointer",
                          display:
                            Object.values(item?.price).length > 1
                              ? "block"
                              : "none",
                        }}
                        onClick={(e) => {
                          console.log(e);
                          handleAddToCart(item, index);
                        }}
                      >
                        Add To Cart{" "}
                      </Button>
                    )}
                  </Box>
                ) : (
                  ""
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
