import {
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Rating,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { AiOutlineFire } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../../Contexts/ContextProvider";
import interceptor from "../../../../utils/interceptors";
import { staticAxios } from "../../../../utils/myAxios";
import ItemDetails from "../../../Modals/Frontend/ItemDetails";
import PopularFoodTabs from "../../PopularFood/PopularFoodTabs";

const Food = ({ id }) => {
  const { setCart, cart, setIngredientId, activeMenu } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  const [size, setSize] = useState({});
  const [item, setItem] = useState(null);

  const { data: popularFood = [] } = useQuery(["popular"], async () => {
    const res = await staticAxios("/popularfood/");
    return res.data;
  });

  const handleModalOpen = (item) => {
    setItem(item);
    setOpenModal(true);
  };
  const handleModalClose = (e) => {
    setOpenModal(false);
  };

  const handleChange = (checkbox) => {
    setSize({
      ...size,
      [checkbox.index]: checkbox.key,
    });
  };

  const handleAddToCart = (param, index) => {
    const item = { ...param, extra: {} };
    setIngredientId(item.category);

    item.price = size[index][1];
    item.size = size[index][0];

    if (cart.find((i) => i.id === item.id && i.size === item.size)) {
      setCart(
        cart?.map((e) => {
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

    // if (cart.find((i) => i.item)) {
    //   setCart(
    //     cart?.map((e) => {
    //       if (e === item) {
    //         return { ...e, count: e.count + 1 };
    //       } else {
    //         return e;
    //       }
    //     })
    //   );
    // } else {
    //   setCart([...cart, { ...item, count: 1 }]);
    // }
  };

  const { data: food = [] } = useQuery(["food"], async () => {
    const res = await interceptor(`category/${id}`);
    return res.data;
  });

  return (
    <Box>
      <Modal open={openModal} onClose={handleModalClose}>
        <ItemDetails handleModalClose={handleModalClose} item={item} />
      </Modal>
      {/* --food-- */}
      <Box
        sx={{
          height: { md: "129vh", overflowY: "scroll" },
        }}
      >
        {food[0]?.foodItems_category?.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Paper
              sx={{
                width: 1,
                marginX: 1,
                marginY: 2,
                padding: 3,
                boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 20%)",
              }}
            >
              <Box
                sx={{
                  display: { md: "flex", gap: 1 },
                  position: "relative",
                  marginBottom: { sm: 0, xs: 5 },
                }}
              >
                <Box
                  sx={{
                    display: { sm: "flex" },
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {/* --img-- */}
                  <Box>
                    <img
                      className="lg:w-40 lg:h-40 w-52 h-52 lg:m-0 m-auto object-contain cursor-pointer"
                      onClick={() => handleModalOpen(item)}
                      src={item.image}
                      alt=""
                    />
                  </Box>

                  {/* --foodDesc-- */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                      onClick={() => handleModalOpen(item)}
                    >
                      {item.food_name}
                    </Typography>
                    <Typography
                      sx={{
                        width: { xs: 1, md: 500 },
                      }}
                      className="text-gray-500"
                    >
                      {item.food_detail.substr(0, 65) +
                        `${item.food_detail.length > 65 ? "..." : ""}`}
                    </Typography>
                    {/* --checkbox-- */}
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        {Boolean(item?.discount_price) ? (
                          <Box>
                            {Object.entries(item?.discount_price).map((key) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <FormControlLabel
                                  control={
                                    <Radio
                                      style={{
                                        color: "#FFC446",
                                      }}
                                    />
                                  }
                                  name="size"
                                  value={key[1]}
                                  onChange={(e) => handleChange({ index, key })}
                                />
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    display: "flex",
                                    gap: 1,
                                  }}
                                  variant="h6"
                                >
                                  <Box component="span">{key[0]} :</Box>
                                  <Box
                                    component="span"
                                    sx={{
                                      textDecoration: "line-through",
                                    }}
                                  >
                                    {item.price[key[0]]}
                                  </Box>
                                  <Box component="span">{key[1]} TK</Box>
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        ) : (
                          Object.entries(item?.price).map((key) => (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <FormControlLabel
                                control={
                                  <Radio
                                    style={{
                                      color: "#FFC446",
                                    }}
                                  />
                                }
                                name="size"
                                value={key[1]}
                                onChange={(e) => handleChange({ index, key })}
                              />
                              <Typography
                                sx={{
                                  fontSize: "17px",
                                }}
                                variant="h6"
                              >{`${key[0]} (${key[1]} TK)`}</Typography>
                            </Box>
                          ))
                        )}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>
                <Box>
                  {/* --review-- */}
                  <Box
                    sx={{
                      position: "absolute",
                      right: { md: 0, xs: "-15px" },
                      top: { md: 0, xs: "-15px" },
                    }}
                    // className="absolute lg:right-0 lg:top-0 md:right-0 md:top-0 -right-3 -top-3"
                  >
                    <Typography
                      sx={{ fontSize: 10, fontWeight: "bold" }}
                      // component="legend"
                    >
                      Review: {item.review}
                    </Typography>
                    <Rating
                      name="read-only"
                      defaultValue={item.review}
                      precision={1}
                      size="small"
                      readOnly
                    />
                  </Box>
                  {/* --submitButton-- */}
                  {activeMenu ? (
                    <Button
                      variant="contained"
                      sx={{
                        ":hover": {
                          backgroundColor: "#FFC446",
                          borderColor: "#FFC446",
                        },
                        position: "absolute",
                        bottom: { md: 0 },
                        right: { md: 0 },
                        height: 35,
                        backgroundColor: "#FFC446",
                        borderColor: "#FFC446",
                        color: "#000",
                        borderRadius: "7px",
                      }}
                      onClick={() => handleAddToCart(item, index)}
                      className="md:w-32 h-8 w-full text-sm font-bold rounded border border-gray-300 cursor-pointer bg-[#FFC446] absolute md:right-0 md:bottom-0 -bottom-12"
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Link to="/cart">
                      <Button
                        variant="contained"
                        sx={{
                          ":hover": {
                            backgroundColor: "#FFC446",
                            borderColor: "#FFC446",
                          },
                          position: "absolute",
                          bottom: { md: 0 },
                          right: { md: 0 },
                          height: 35,
                          backgroundColor: "#FFC446",
                          borderColor: "#FFC446",
                          color: "#000",
                          borderRadius: "7px",
                        }}
                        onClick={() => handleAddToCart(item, index)}
                        className="md:w-32 h-8 w-full text-sm font-bold rounded border border-gray-300 cursor-pointer bg-[#FFC446] absolute md:right-0 md:bottom-0 -bottom-12"
                      >
                        Add to Cart
                      </Button>
                    </Link>
                  )}
                </Box>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
      {/* --popularFood-- */}
      {/* <PopularFoodTabs /> */}
    </Box>
  );
};

export default Food;
