import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { staticAxios } from "../../../utils/myAxios";

const CartItems = ({ cart, setCart, item }) => {
  // const addExtra = (extraId, price = 0) => {
  //   setCart(
  //     cart.map((e) => {
  //       if (e.id === item.id && e.size === item.size) {
  //         const existing = e?.extra && Boolean(e.extra[extraId]);
  //         return {
  //           ...e,
  //           extra: {
  //             ...e.extra,
  //             [extraId]: existing ? null : price,
  //           },
  //         };
  //       } else {
  //         return e;
  //       }
  //     })
  //   );
  // };
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

  // const handleIncrement = (item) => {
  //   if (
  //     cart.find(
  //       (i) =>
  //         i.id === item.id && i.size === item.size && Object.keys(item?.extra)
  //     )
  //   ) {
  //     setCart(
  //       cart.map((e) => {
  //         if (
  //           e.id === item.id &&
  //           e.size === item.size &&
  //           Object.keys(item?.extra)
  //         ) {
  //           return { ...e, count: e.count + 1 };
  //         } else {
  //           return e;
  //         }
  //       })
  //     );
  //   } else {
  //     setCart([...cart, { ...item, count: 1 }]);
  //   }
  // };

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

  // const handleDecrement = (item) => {
  //   if (cart.find((i) => i.id === item.id && i.size === item.size)) {
  //     setCart(
  //       cart.map((e) => {
  //         if (e.id === item.id && e.size === item.size && e.count > 1) {
  //           return { ...e, count: e.count - 1 };
  //         } else {
  //           return e;
  //         }
  //       })
  //     );
  //   }
  // };

  // --extraIngredients--
  const { data: { data: ingredients = [] } = {} } = useQuery(
    [`/customize_food_category/${item.category}`],
    () => staticAxios(`/customize_food_category/${item.category}`)
  );

  // const { data: ingredients = [] } = useQuery([
  //   `/customize_food_category/${item.category}`,
  // ]);

  // --remove item--
  const removeItem = (id) => {
    const deleted = cart.filter((item) => item.id !== id);
    setCart(deleted);
  };

  return (
    <Box
      sx={{
        // marginX: 1,
        marginY: 1,
        paddingY: 1,
        paddingX: 2,
        borderRadius: "5px",
        boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 20%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          position: "relative",
        }}
        // className="flex items-center gap-3 md:flex-nowrap flex-wrap relative"
      >
        <img
          className="lg:w-16 lg:h-16 w-20 h-20 object-cover rounded-full border-2 border-gray-400"
          src={item.image}
          alt=""
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {item.food_name}
          </Typography>
          <Typography>{`Size: ${item?.size}`}</Typography>
        </Box>

        {/* --remove-- */}
        <MdClose
          onClick={() => removeItem(item.id)}
          className="absolute md:right-0 -right-2 top-0 cursor-pointer text-red-600 text-xl border border-gray-700 rounded-full"
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
        // className="flex justify-between items-center relative"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AiOutlineMinus
            onClick={() => handleDecrement(item)}
            className="inline lg:w-5 lg:h-5 w-6 h-6 border border-gray-600 md:rounded rounded-sm cursor-pointer"
          />
          <Typography className="text-xl">{item?.count}</Typography>
          <GrAdd
            onClick={() => handleIncrement(item)}
            className="inline lg:w-5 lg:h-5 w-6 h-6 border border-gray-800 md:rounded rounded-sm cursor-pointer"
          />
        </Box>
        <div>
          <h3 className="lg:text-xl text-xl font-semibold">
            {item?.price
              ? Number(item?.price * item?.count) +
                Number(
                  item?.extra
                    ? Object.values(item?.extra)?.reduce((a, b) => a + b, 0) *
                        item?.count
                    : 0
                )
              : 0}
            <span className="md:text-lg font-semibold pl-1">৳</span>
          </h3>
        </div>
      </Box>
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
                          color: "#FFC446",
                        }}
                      />
                    }
                    label={extraPrice.ingredient_name}
                    name="size"
                    value={
                      item?.extra ? Boolean(item?.extra[extraPrice?.id]) : false
                    }
                    onChange={() => addExtra(extraPrice.id, extraPrice.price)}
                  />
                </Box>
                <Typography variant="h6" sx={{ fontSize: "14px" }}>
                  {extraPrice.price} ৳
                </Typography>
              </Box>
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CartItems;
