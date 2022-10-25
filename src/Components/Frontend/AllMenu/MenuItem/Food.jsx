import {
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Rating,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FiStar } from "react-icons/fi";
import { useStateContext } from "../../../../Contexts/ContextProvider";
import { staticAxios } from "../../../../utils/myAxios";
import ItemDetails from "../../../Modals/Frontend/ItemDetails";
import { FaStar } from "react-icons/fa";

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
    // console.log(!size === {});
    // item.price = size[index][1] ? size[index][1] : key;
    // console.log(Boolean(Object.entries(size).length));
    // if (Boolean(Object.entries(size).length)) {
    //   console.log(Boolean(Object.entries(size).length));
    //   console.log(key);
    //   // setSize({
    //   //   ...size,
    //   //   [index]: key[0],
    //   // });
    item.price = key[1];
    item.size = key[0];
    // } else {
    //   item.price = key[1];
    //   item.size = "regular";
    // }

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
        sx={{
          height: { md: "129vh", overflowY: "scroll" },
        }}
      >
        {food[0]?.foodItems_category?.map((item, index) => (
          <div key={item.id}>
            <div className="border-2 rounded-lg my-2 p-2">
              <div className="relative">
                <div className="md:flex gap-5">
                  <img
                    className="md:w-56 md:h-44 w-full h-36 object-cover rounded-md md:m-0 m-auto"
                    src={item?.image}
                    alt=""
                  />
                  <div>
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
                    {/* --size-- */}
                    <div className="overflow-x-scroll">
                      <div
                        className={`${activeMenu ? "w-[550px]" : "w-[550px]"} `}
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
                                          },
                                        }}
                                        control={
                                          <Radio
                                            style={{
                                              color: "#F0A70B",
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
                                          fontSize: "14px",
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                        }}
                                        variant="h6"
                                      >
                                        <Typography sx={{ p: -10 }}>
                                          {key[0]} :
                                        </Typography>
                                        <Typography
                                          sx={{
                                            textDecoration: "line-through",
                                          }}
                                        >
                                          {item.price[key[0]]}
                                        </Typography>
                                        <Typography sx={{ mr: 1 }}>
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
                                      <Typography
                                        sx={{
                                          fontSize: "17px",
                                          mr: { xs: 1 },
                                        }}
                                        variant="h6"
                                      >{`${key[0].replace("inch", '"')} ${
                                        key[1]
                                      } ৳`}</Typography>
                                      {/* <IoMdAdd
                                        style={{
                                          cursor: "pointer",
                                          display:
                                            Object.values(item?.price).length >
                                            1
                                              ? "none"
                                              : "block",
                                        }}
                                        className={`border border-[#F0A70B] text-[#F0A70B] absolute inline-block w-8 h-8 cursor-pointer rounded-md ${
                                          activeMenu
                                            ? "left-[500px]"
                                            : "left-[300px]"
                                        }`}
                                        onClick={() =>
                                          handleAddToCartSingleValue(item, key)
                                        }
                                      /> */}
                                    </Box>
                                  );
                                })}
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                </div>
                <Box className="flex gap-2 items-center absolute lg:top-0 md:top-4 md:right-3 lg:right-2 right-10 top-[10.3rem]  ">
                  <FaStar className="text-[#F0A70B]" />
                  <h2>{item.review}.0</h2>
                </Box>

                <div
                  style={{
                    display:
                      Object.values(item?.price).length === 1
                        ? "none"
                        : "block",
                  }}
                  className="absolute lg:right-2 lg:bottom-0 md:right-3 md:top-36 right-0 top-[10rem]"
                >
                  <IoMdAdd
                    className="border border-[#F0A70B] inline-block w-8 h-8 rounded-md text-[#F0A70B]"
                    onClick={() => handleAddToCart(item, index)}
                  />
                </div>

                {Boolean(item?.discount_price)
                  ? Object.entries(item?.discount_price).map((key) => {
                      return <Box></Box>;
                    })
                  : Object.entries(item?.price).map((key) => {
                      return (
                        <Box className="absolute md:left-[16.3rem] md:top-36 -left-3 top-[10rem]">
                          <IoMdAdd
                            style={{
                              cursor: "pointer",
                              display:
                                Object.values(item?.price).length > 1
                                  ? "none"
                                  : "block",
                            }}
                            className={`border border-[#F0A70B] text-[#F0A70B] absolute inline-block w-8 h-8 cursor-pointer rounded-md ${
                              activeMenu ? "left-[500px]" : "left-[300px]"
                            }`}
                            onClick={() =>
                              handleAddToCartSingleValue(item, key)
                            }
                          />
                        </Box>
                      );
                    })}

                {/* {Object.entries(item?.price)?.map((key) => {
                  return (
                    <Box className="absolute lg:left-[24.6rem] md:left-[22.3rem] md:top-36 -left-3 top-[10rem]">
                      <IoMdAdd
                        style={{
                          cursor: "pointer",
                          display:
                            Object.values(item?.price).length > 1
                              ? "none"
                              : "block",
                        }}
                        className={`border border-[#F0A70B] text-[#F0A70B] absolute inline-block w-8 h-8 cursor-pointer rounded-md ${
                          activeMenu ? "left-[500px]" : "left-[300px]"
                        }`}
                        onClick={() => handleAddToCartSingleValue(item, key)}
                      />
                    </Box>
                  );
                })} */}
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
