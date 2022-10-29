import { Global } from "@emotion/react";
// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIos";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
// import MuiAccordion from "@mui/material/Accordion";
// import MuiAccordionDetails from "@mui/material/AccordionDetails";
// import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import * as React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { staticAxios } from "../../../utils/myAxios";

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
    () => staticAxios(`/customize_food_category/${item.category}`)
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

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={setOpen}
        onOpen={open}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          {/* <Typography sx={{ p: 2, color: "text.secondary" }}>
            51 results
          </Typography> */}

          <Box className="p-10">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                row
              >
                {Boolean(item?.discount_price)
                  ? Object.entries(item?.discount_price).map((key) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FormControlLabel
                          sx={{
                            "&.MuiFormControlLabel-root": {
                              mr: 0,
                              pl:
                                Object.values(item?.discount_price).length < 2
                                  ? 2
                                  : 0,
                            },
                          }}
                          control={
                            <Radio
                              size={activeMenu ? "small" : "medium"}
                              style={{
                                color: "#F0A70B",
                                display:
                                  Object.values(item?.discount_price).length < 2
                                    ? "none"
                                    : "block",
                              }}
                            />
                          }
                          name="size"
                          value={key[1]}
                          onChange={(e) => handleChange({ index, key })}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                          variant="h6"
                        >
                          <Typography
                            sx={{
                              fontSize: {
                                sm: "12px",
                                md: "16px",
                              },
                              // pl: 2,
                            }}
                          >
                            {key[0] ? key[0] : "Price:"} :
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: {
                                sm: "12px",
                                md: "14px",
                              },
                              textDecoration: "line-through",
                            }}
                          >
                            {item.price[key[0]]}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: {
                                sm: "20px",
                                md: "px",
                              },
                              mr: 1,
                            }}
                          >
                            {key[1]} ৳
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  : Object.entries(item?.price).map((key) => {
                      return (
                        <Box className="flex items-center">
                          <FormControlLabel
                            sx={{
                              "&.MuiFormControlLabel-root": {
                                mr: 0,
                                pl:
                                  Object.values(item?.price).length < 2 ? 2 : 0,
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
                          <Box className="flex  items-center">
                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: {
                                  sm: "14px",
                                },
                                mr: { xs: 1 },
                              }}
                              variant="h6"
                            >{`${
                              key[0] ? key[0].replace("inch", '"') : "price"
                            }`}</Typography>

                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: {
                                  sm: "20px",
                                },
                                mr: { xs: 1 },
                              }}
                              variant="h6"
                            >{`${key[1]} ৳`}</Typography>
                          </Box>
                        </Box>
                      );
                    })}
              </RadioGroup>
            </FormControl>

            <Box>
              <Box className="flex md:gap-5 justify-between items-center md:items-start ">
                <Box className="  ">
                  <FaStar className="text-[#F0A70B] text-xl" />
                  <Typography variant="caption">{item.review}.0</Typography>
                </Box>
                <Box>
                  {Boolean(item?.discount_price) ? (
                    <Box>
                      {Object.values(item?.discount_price).length < 2 ? (
                        Object.entries(item?.discount_price).map((key, i) => {
                          console.log(item?.discount_price);
                          return (
                            <IoMdAdd
                              key={i}
                              style={{
                                cursor: "pointer",
                                display:
                                  Object.values(item?.discount_price).length > 1
                                    ? "none"
                                    : "block",
                              }}
                              className={`border border-[#F0A70B] text-[#F0A70B]  inline-block  w-10 h-10 md:w-8 md:h-8 cursor-pointer rounded-md 
                               
                                `}
                              onClick={(e) => {
                                console.log(e);
                                handleAddToCartSingleValue(item, key);
                              }}
                            />
                          );
                        })
                      ) : (
                        <IoMdAdd
                          style={{
                            cursor: "pointer",
                            display:
                              Object.values(item?.discount_price).length > 1
                                ? "block"
                                : "none",
                          }}
                          className={`border border-[#F0A70B] text-[#F0A70B]  inline-block w-10 h-10 md:w-8 md:h-8 cursor-pointer rounded-md ${
                            activeMenu ? "left-[500px]" : "left-[300px]"
                          }`}
                          onClick={(e) => {
                            console.log(e);
                            handleAddToCart(item, index);
                          }}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box>
                      {Object.values(item?.price).length < 2 ? (
                        Object.entries(item?.price).map((key, i) => {
                          console.log(item?.price);
                          return (
                            <IoMdAdd
                              key={i}
                              style={{
                                cursor: "pointer",
                                display:
                                  Object.values(item?.price).length > 1
                                    ? "none"
                                    : "block",
                              }}
                              className={`border border-[#F0A70B] text-[#F0A70B]  inline-block w-10 h-10 md:w-8 md:h-8 cursor-pointer rounded-md ${
                                activeMenu ? "left-[500px]" : "left-[300px]"
                              }`}
                              onClick={(e) => {
                                console.log(e);
                                handleAddToCartSingleValue(item, key);
                              }}
                            />
                          );
                        })
                      ) : (
                        <IoMdAdd
                          style={{
                            cursor: "pointer",
                            display:
                              Object.values(item?.price).length > 1
                                ? "block"
                                : "none",
                          }}
                          className={`border border-[#F0A70B] text-[#F0A70B]  inline-block w-10 h-10 md:w-8 md:h-8 cursor-pointer rounded-md ${
                            activeMenu ? "left-[500px]" : "left-[300px]"
                          }`}
                          onClick={(e) => {
                            console.log(e);
                            handleAddToCart(item, index);
                          }}
                        />
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
            className="p-5"
            // className="flex justify-between items-center relative"
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              <AiOutlineMinus
                onClick={() => handleDecrement(item)}
                className="inline text-xl  cursor-pointer"
              />
              <Typography className="text-2xl">{item?.count}</Typography>
              <GrAdd
                onClick={() => handleIncrement(item)}
                style={{}}
                className="inline text-xl    cursor-pointer"
              />
            </Box>
            {/* <div>
              <h3 className="lg:text-xl text-xl font-semibold">
                {item?.price
                  ? Number(item?.price * item?.count) +
                    Number(
                      item?.extra
                        ? Object.values(item?.extra)?.reduce(
                            (a, b) => a + b,
                            0
                          ) * item?.count
                        : 0
                    )
                  : 0}
                <span className="md:text-lg font-semibold pl-1">৳</span>
              </h3>
            </div> */}
          </Box>
        </StyledBox>
        {/* <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <Skeleton variant="rectangular" height="100%" />
        </StyledBox> */}
      </SwipeableDrawer>
    </Root>
  );
}

AddToCartModal.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AddToCartModal;
