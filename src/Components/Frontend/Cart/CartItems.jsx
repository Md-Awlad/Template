import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { MdClose } from "react-icons/md";

const CartItems = ({ cart, setCart, item }) => {
  const addExtra = (extraId, price = 0) => {
    setCart(
      cart?.map((e) => {
        if (e === item) {
          if (Object.keys(e.extra).length) {
            for (const key in e.extra) {
              if (parseInt(key) === extraId) {
                delete e.extra[extraId];
                break;
              } else {
                e["extra"] = {
                  ...e?.extra,
                  [extraId]: price,
                };
              }
            }
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

  // --remove item--
  const removeItem = (sId) => {
    const deleted = cart.filter((item) => item.sId !== sId);
    setCart(deleted);
  };
  return (
    <Box
      className="border-2 w-full"
      sx={{
        marginY: 1,
        padding: 2,
        borderRadius: "5px",
        position: "relative",
        mr: 1,
      }}
    >
      <Box
        className="space-x-3"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          className="w-16 h-16  object-cover rounded-full border-2 border-gray-400"
          src={item?.image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "https://i.ibb.co/XbJNdft/defaultfood.png";
          }}
          alt="img"
        />
        <Box>
          <Typography component="span" variant="h6" sx={{ fontWeight: 500 }}>
            {item.food_name.substr(0, 20) +
              `${item.food_name.length > 20 ? ".." : ""}`}
          </Typography>
          {item?.size && (
            <Typography component="span">{`Size:${item?.size}`}</Typography>
          )}
        </Box>

        {/* --remove-- */}

        <MdClose
          onClick={() => removeItem(item.sId, item.index)}
          className="absolute  right-[4px]  top-[4px] text-red-600 text-2xl border border-gray-700 rounded-full cursor-pointer"
        />
      </Box>
      {/* --countBtn-- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          className="space-x-3"
          sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}
        >
          <AiOutlineMinus
            onClick={() => handleDecrement(item)}
            className="inline text-2xl lg:text-xl  cursor-pointer"
          />
          <Typography component="span" className="text-2xl">
            {item?.count}
          </Typography>
          <GrAdd
            onClick={() => handleIncrement(item)}
            style={{}}
            className="inline  text-2xl lg:text-xl     cursor-pointer"
          />
        </Box>
        <div>
          <h3 className=" text-xl font-semibold">
            {item?.price
              ? Number(item?.price * item?.count) +
                Number(
                  item?.extra
                    ? Object.values(item?.extra)?.reduce((a, b) => a + b, 0) *
                        item?.count
                    : 0
                )
              : 0}
            <span className="md:text-lg font-semibold pl-1"></span>
          </h3>
        </div>
      </Box>
      {/* --extra-- */}
      {Boolean(item?.customize_food?.length) ? (
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
              component="span"
              sx={{
                fontWeight: "semibold",
                fontSize: { md: 16, xs: 20 },
              }}
            >
              Extra Ingredients
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="span">
              {item?.customize_food?.map((extraPrice, index) => {
                return (
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
                      component="span"
                      variant="h6"
                      sx={{ fontSize: "14px" }}
                    >
                      {extraPrice?.price}
                    </Typography>
                  </Box>
                );
              })}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </Box>
  );
};

export default CartItems;
