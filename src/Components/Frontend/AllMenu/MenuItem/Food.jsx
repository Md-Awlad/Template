import { Grid, Modal, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useStateContext } from "../../../../Contexts/ContextProvider";
import { staticAxios } from "../../../../utils/myAxios";
import AddToCartModal from "../../../Modals/Frontend/AddToCartModal";
import ItemDetails from "../../../Modals/Frontend/ItemDetails";

const Food = ({ id }) => {
  const { activeMenu } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState(null);
  const [foodItem, setFoodItem] = useState({});
  const [foodIndex, setFoodIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    console.log(newOpen);
    setOpen(newOpen);
  };

  // const { data: popularFood = [] } = useQuery(["popular"], async () => {
  //   const res = await staticAxios("/popularfood/");
  //   return res.data;
  // });

  // const handleModalOpen = (item) => {
  //   setItem(item);
  //   setOpenModal(true);
  // };
  const handleModalClose = (e) => {
    setOpenModal(false);
  };

  const { data: food = [] } = useQuery(["food"], async () => {
    const res = await staticAxios(`category/${id}`);
    return res.data;
  });

  const handleItemAndToggle = (foodItem, index) => {
    console.log(foodItem);
    setOpen(true);
    setFoodIndex(index);
    setFoodItem(foodItem);
  };
  return (
    <Box sx={{ mb: 10 }}>
      <Modal open={openModal} onClose={handleModalClose}>
        <ItemDetails handleModalClose={handleModalClose} item={item} />
      </Modal>
      {/* --food-- */}
      <Box
        className=" "
        sx={{
          height: { md: "129vh", overflowY: "scroll" },
        }}
      >
        <Grid container sx={{ padding: 0 }}>
          {food[0]?.foodItems_category?.map((item, index) => (
            <Grid item xs={12} md={6} sx={{ padding: 0 }}>
              <div
                key={item.id}
                onClick={() => handleItemAndToggle(item, index)}
              >
                <div className="border-2 shadow-md  rounded-lg   cursor-pointer">
                  <div className="md:flex justify-between">
                    <div className=" md:flex gap-5 p-2">
                      <div className="md:w-32 md:h-32  md:m-0 m-auto ">
                        <img
                          className=" object-cover  w-full h-full rounded-md "
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
                            className={` ${
                              activeMenu
                                ? "550px"
                                : `${
                                    Object.entries(
                                      item?.discount_price || item.price
                                    ).length > 1 && "w-[550px]"
                                  }`
                            } `}
                          >
                            {/* <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            row
                          > */}
                            {Boolean(item?.discount_price)
                              ? Object.entries(item?.discount_price).map(
                                  (key) => (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      {/* <FormControlLabel
                                        sx={{
                                          "&.MuiFormControlLabel-root": {
                                            mr: 0,
                                            pl:
                                              Object.values(
                                                item?.discount_price
                                              ).length < 2
                                                ? 2
                                                : 0,
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
                                name="size" value={key[1]}
                                onChange={(e) => handleChange({ index, key })}
                                /> */}
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
                                              // sm: "12px",
                                              md: "12px",
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
                                              sm: "14px",
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
                                    <Box className="flex items-center">
                                      {/* <FormControlLabel
                                        sx={{
                                          "&.MuiFormControlLabel-root": {
                                            mr: 0,
                                            pl:
                                              Object.values(item?.price)
                                                .length < 2
                                                ? 2
                                                : 0,
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
                                      /> */}
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
                                          key[0]
                                            ? key[0].replace("inch", '"')
                                            : "price"
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
                            {/* </RadioGroup>
                        </FormControl> */}
                          </div>
                        </div>
                        {/* --size End-- */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* --popularFood-- */}
      {/* <PopularFoodTabs /> */}

      {open && (
        <AddToCartModal
          open={open}
          index={foodIndex}
          item={foodItem}
          setOpen={() => setOpen(false)}
        />
      )}
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
