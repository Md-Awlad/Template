import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Rating,
  Snackbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { AiOutlineFire } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
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
  const [size2, setSize2] = useState({});
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
    console.log(checkbox);
    setSize({
      ...size,
      [checkbox.index]: checkbox.key,
    });
  };
  const handleChange2 = () => {
    setSize2({
      ...size2,
    });
  };

  const handleAddToCart2 = (param, key) => {
    console.log(key);
    const item = { ...param, extra: {} };
    setIngredientId(item.category);
    item.price = key;
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
  console.log(size);
  const handleAddToCart = (param, index) => {
    const item = { ...param, extra: {} };
    setIngredientId(item.category);

    item.price = size[index][1];
    item.size = size[index][0];

    // if (cart.find((i) => i.id === item.id && i.size === item.size)) {
    //   setCart(
    //     cart?.map((e) => {
    //       if (e.id === item.id && e.size === item.size) {
    //         return { ...e, count: e.count + 1 };
    //       } else {
    //         return e;
    //       }
    //     })
    //   );
    // } else {
    //   setCart([...cart, { ...item, count: 1 }]);
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
                    className="md:w-56 md:h-44 w-56 h-28 object-cover rounded-lg  md:rounded-2xl lg:m-0 m-auto"
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
                      {item.food_name}
                    </Typography>
                    {/* --size-- */}
                    <div className="overflow-x-scroll">
                      <div className="w-[550px] ">
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
                                              color: "#FFC446",
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
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      {Object.values(item?.price).length < 2 ? (
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
                                                display: "none",
                                              }}
                                            />
                                          }
                                          //   {
                                          //     Object.values(item?.price).length ===
                                          //       1
                                          //  }
                                          name="size"
                                          value={key[1]}

                                          // onChange={(e) =>
                                          //   handleChange({ index, key })
                                          // }
                                        />
                                      ) : (
                                        <FormControlLabel
                                          sx={{
                                            "&.MuiFormControlLabel-root": {
                                              mr: 0,
                                            },
                                          }}
                                          control={
                                            <Radio
                                              style={{
                                                color: "#FFC446",
                                              }}
                                            />
                                          }
                                          //   {
                                          //     Object.values(item?.price).length ===
                                          //       1
                                          //  }
                                          name="size"
                                          value={key[1]}
                                          onClick={(e) =>
                                            handleChange({ index, key })
                                          }
                                        />
                                      )}

                                      <Typography
                                        sx={{
                                          fontSize: "17px",
                                        }}
                                        variant="h6"
                                      >{`${key[0].replace("inch", '"')} ${
                                        key[1]
                                      } ৳`}</Typography>
                                      {/* <IoMdAdd
                                        className="border inline-block md:w-4 md:h-4 w-8 h-8 rounded-md "
                                        onClick={() =>
                                          handleAddToCart2(item, key[1])
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
                <div className="absolute md:right-0 md:top-16 right-0 top-[7.9rem]">
                  <IoMdAdd
                    className="border inline-block md:w-10 md:h-10 w-8 h-8 rounded-md cursor-pointer hover:bg[#FFC446]"
                    onClick={() => handleAddToCart(item, index)}
                  />
                  {/* <IoMdAdd
                    className="border inline-block md:w-4 md:h-4 w-8 h-8 rounded-md "
                    onClick={() => handleAddToCart2(item, index)}
                  /> */}
                </div>
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
                    //   backgroundColor: "#FFC446",
                    //   borderColor: "#FFC446",
                    // },
                    // position: "absolute",
                    // bottom: { md: 0 },
                    // right: { md: 0 },
                    // height: 35,
                    // backgroundColor: "#FFC446",
                    // borderColor: "#FFC446",
                    // color: "#000",
                    // borderRadius: "7px",
                    "&.MuiButton-root": {
                      minWidth: 0,
                      minHight: 0,
                      padding: 0,
                    },
                  }}

                  // className="md:w-32 h-8 w-full text-sm font-bold rounded border border-gray-300 cursor-pointer bg-[#FFC446] absolute md:right-0 md:bottom-0 -bottom-12"
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
