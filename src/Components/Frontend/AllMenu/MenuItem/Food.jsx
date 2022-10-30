import { Grid, Modal, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
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
  const [onClose, setOnClose] = useState(false);
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
            <Grid item sm={6} md={6} sx={{ padding: 0 }}>
              <div
                key={item.id}
                onClick={() => handleItemAndToggle(item, index)}
              >
                <Box
                  sx={{
                    minHeight: { xs: 300, sm: "auto", md: "auto" },
                  }}
                  className="border-2 shadow-md  rounded-lg   cursor-pointer relative"
                >
                  <div className="md:flex justify-between">
                    <div className=" md:flex gap-5 p-2">
                      <div className=" md:m-0 md:w-32 md:h-32 w-full h-44  m-auto relative ">
                        <img
                          className=" object-cover w-full h-full  rounded-md  "
                          src={item?.image}
                          alt=""
                        />
                        <IoMdAdd className="absolute text-xl font-bold bottom-1 right-1 bg-white text-gray-900 rounded-md p-1" />
                      </div>
                      <div>
                        <div className="md:flex justify-between">
                          <Typography
                            sx={{
                              fontWeight: 500,
                            }}
                          >
                            {item.food_name.substr(0, 20) +
                              `${item.food_name.length > 20 ? ".." : ""}`}
                          </Typography>
                        </div>
                        <Typography
                          sx={{
                            fontSize: 12,
                            fontWeight: 500,
                          }}
                        >
                          {item.base_ingredient.substr(0, 100) +
                            `${item.base_ingredient.length > 100 ? ".." : ""}`}
                        </Typography>
                        {/* --size-- */}

                        <div className="overflow-x-scroll">
                          <div>
                            {Boolean(item?.discount_price)
                              ? Object.entries(item?.discount_price).map(
                                  (key, index) => (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      {index === 0 && (
                                        <Box className="absolute flex  items-center bottom-3">
                                          <Typography
                                            sx={{
                                              fontSize: {
                                                md: "16px",
                                              },
                                              pr: 1,
                                            }}
                                          >
                                            {`from TK `}
                                          </Typography>

                                          <Typography
                                            sx={{
                                              fontSize: {
                                                sm: "13px",
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
                                                sm: "18px",
                                              },
                                              mr: 1,
                                            }}
                                          >
                                            {key[1]} ৳
                                          </Typography>
                                        </Box>
                                      )}
                                    </Box>
                                  )
                                )
                              : Object.entries(item?.price).map(
                                  (key, index) => {
                                    return (
                                      <Box className="flex items-center">
                                        {Boolean(index === 0) && (
                                          <Box className=" absolute flex  items-center bottom-3">
                                            <Typography
                                              sx={{
                                                fontSize: "16px",

                                                pr: 1,
                                              }}
                                            >
                                              {`from TK `}
                                            </Typography>

                                            <Typography
                                              sx={{
                                                fontWeight: 500,
                                                fontSize: {
                                                  sm: "18px",
                                                },
                                                mr: 1,
                                              }}
                                            >
                                              {key[1]} ৳
                                            </Typography>
                                          </Box>
                                        )}
                                      </Box>
                                    );
                                  }
                                )}
                          </div>
                        </div>
                        {/* --size End-- */}
                      </div>
                    </div>
                  </div>
                </Box>
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
          onClose={onClose}
          setOpen={() => setOpen(false)}
        />
      )}
    </Box>
  );
};

export default Food;
