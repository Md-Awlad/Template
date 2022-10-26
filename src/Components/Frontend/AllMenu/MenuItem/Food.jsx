import {
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useStateContext } from "../../../../Contexts/ContextProvider";
import { staticAxios } from "../../../../utils/myAxios";
import ItemDetails from "../../../Modals/Frontend/ItemDetails";

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

  const { data: food = [] } = useQuery(["food"], async () => {
    const res = await staticAxios(`category/${id}`);
    return res.data;
  });
  return (
    <Box sx={{ mb: 10 }}>
      <Modal open={openModal} onClose={handleModalClose}>
        <ItemDetails handleModalClose={handleModalClose} item={item} />
      </Modal>
      {/* --food-- */}
      <Box
        className="lg:p-2 "
        sx={{
          height: { md: "129vh", overflowY: "scroll" },
        }}
      >
        {food[0]?.foodItems_category?.map((item, index) => (
          <div key={item.id}>
            <div className="border-2 shadow-md  rounded-lg my-2 p-2 ">
              <div className="md:flex justify-between">
                <div className=" md:flex gap-5 ">
                  <div className="md:w-56 md:h-44 w-full h-36 rounded-md md:m-0 m-auto">
                    <img
                      className="w-full h-full object-cover rounded-md "
                      src={item?.image}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <Typography
                        variant="h6"
                        sx={{
                          my: { xs: 2 },
                          fontSize: 20,
                          fontWeight: 500,
                        }}
                        // onClick={() => handleModalOpen(item)}
                      >
                        {item.food_name.substr(0, 20) +
                          `${item.food_name.length > 20 ? ".." : ""}`}
                      </Typography>
                    </div>

                    {/* --size-- */}
                    <div className="overflow-x-scroll">
                      <div
                        className={`${
                          activeMenu
                            ? "w-[450px]"
                            : `${
                                Object.entries(
                                  item?.discount_price || item.price
                                ).length > 1 && "w-[550px]"
                              }`
                        } `}
                      >
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            row
                          >
                            {Boolean(item?.discount_price)
                              ? Object.entries(item?.discount_price).map(
                                  (key) => (
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
                                            p: { md: 1 },
                                          },
                                        }}
                                        control={
                                          <Radio
                                            size={
                                              activeMenu ? "small" : "medium"
                                            }
                                            style={{
                                              color: "#F0A70B",
                                              display:
                                                Object.values(
                                                  item?.discount_price
                                                ).length < 2
                                                  ? "none"
                                                  : "block",
                                            }}
                                          />
                                        }
                                        name="size"
                                        value={key[1]}
                                        onChange={(e) =>
                                          handleChange({ index, key })
                                        }
                                      />
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                        }}
                                        variant="h6"
                                      >
                                        {/* <Typography
                                          sx={{
                                            fontSize: {
                                              sm: "12px",
                                              md: "16px",
                                            },
                                            pl: 2,
                                          }}
                                        >
                                          {key[0]} :
                                        </Typography> */}
                                        <Typography
                                          sx={{
                                            fontSize: {
                                              sm: "12px",
                                              md: "14px",
                                            },
                                          }}
                                        >
                                          {"Price:"}
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
                                  )
                                )
                              : Object.entries(item?.price).map((key) => {
                                  return (
                                    <Box
                                      className="flex items-center"
                                      // sx={{
                                      //   display: "flex",
                                      //   alignItems: "center",
                                      //   justifyContent: "space-between",
                                      //   // Object.entries(item?.price).length < 2
                                      //   //   ? "space-between"
                                      //   //   : "",
                                      // }}
                                    >
                                      <FormControlLabel
                                        sx={{
                                          "&.MuiFormControlLabel-root": {
                                            mr: 0,
                                            p: 2,
                                          },
                                        }}
                                        control={
                                          <Radio
                                            style={{
                                              color: "#FFC446",
                                              display:
                                                Object.values(item?.price)
                                                  .length < 2
                                                  ? "none"
                                                  : "block",
                                            }}
                                          />
                                        }
                                        name="size"
                                        value={key[1]}
                                        onClick={(e) =>
                                          handleChange({ index, key })
                                        }
                                      />
                                      <Box className="flex gap-1 items-center">
                                        {/* <Typography
                                          sx={{
                                            fontWeight: 500,
                                            fontSize: {
                                              sm: "14px",
                                            },
                                            mr: { xs: 1 },
                                          }}
                                          variant="h6"
                                        >{`${key[0].replace(
                                          "inch",
                                          '"'
                                        )}`}</Typography> */}
                                        <Typography
                                          sx={{
                                            fontSize: {
                                              sm: "12px",
                                              md: "14px",
                                            },
                                          }}
                                        >
                                          {"Price:"}
                                        </Typography>
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
                      </div>
                    </div>
                  </div>
                </div>
                <Box className="flex md:gap-5 justify-between items-center md:items-start p-2">
                  <Box className="  ">
                    <FaStar className="text-[#F0A70B] text-xl" />
                    <Typography variant="caption">{item.review}.0</Typography>
                  </Box>
                  <Box>
                    {Boolean(item?.discount_price) ? (
                      <Box>
                        {Object.values(item?.discount_price).length < 2 ? (
                          Object.entries(item?.discount_price).map((key) => {
                            console.log(item?.discount_price);
                            return (
                              <IoMdAdd
                                style={{
                                  cursor: "pointer",
                                  display:
                                    Object.values(item?.discount_price).length >
                                    1
                                      ? "none"
                                      : "block",
                                }}
                                className={`border border-[#F0A70B] text-[#F0A70B]  inline-block  w-10 h-10 md:w-8 md:h-8 cursor-pointer rounded-md 
                               
                                `}
                                onClick={() =>
                                  handleAddToCartSingleValue(item, key)
                                }
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
                            onClick={() => handleAddToCart(item, index)}
                          />
                        )}
                      </Box>
                    ) : (
                      <Box>
                        {Object.values(item?.price).length < 2 ? (
                          Object.entries(item?.price).map((key) => {
                            console.log(item?.price);
                            return (
                              <IoMdAdd
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
                                onClick={() =>
                                  handleAddToCartSingleValue(item, key)
                                }
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
                            onClick={() => handleAddToCart(item, index)}
                          />
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        ))}
      </Box>
      {/* --popularFood-- */}
      {/* <PopularFoodTabs /> */}
    </Box>
  );
};

export default Food;

/*
 --review-- 
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
<Button
                  variant="outlined"
                  sx={{
                    // ":hover": {
                    //   backgroundColor: "#F0A70B",
                    //   borderColor: "#F0A70B",
                    // },
                    // position: "absolute",
                    // bottom: { md: 0 },
                    // right: { md: 0 },
                    // height: 35,
                    // backgroundColor: "#F0A70B",
                    // borderColor: "#F0A70B",
                    // color: "#000",
                    // borderRadius: "7px",
                    "&.MuiButton-root": {
                      minWidth: 0,
                      minHight: 0,
                      padding: 0,
                    },
                  }}
                  // className="md:w-32 h-8 w-full text-sm font-bold rounded border border-gray-300 cursor-pointer bg-[#F0A70B] absolute md:right-0 md:bottom-0 -bottom-12"
                >
                </Button>
 <Typography
                      sx={{
                        width: { xs: 1, md: 500 },
                      }}
                      className="text-gray-500"
                    >
                      {item.food_detail.substr(0, 65) +
                        `${item.food_detail.length > 65 ? "..." : ""}`}
                    </Typography>
*/
