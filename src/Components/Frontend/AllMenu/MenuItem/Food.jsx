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
import { useEffect } from "react";
import { useState } from "react";
import { useStateContext } from "../../../../Contexts/ContextProvider";
import interceptor from "../../../../utils/interceptors";
import ItemDetails from "../../../Modals/Frontend/ItemDetails";

const Food = ({ id }) => {
  const { setCart, cart } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  const [size, setSize] = useState({});
  const [item, setItem] = useState(null);
  const [details, setDetails] = useState();

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
    const item = { ...param };

    item.price = size[index][1];
    item.size = size[index][0];

    if (cart.find((i) => i.id === item.id && i.size === item.size)) {
      setCart(
        cart.map((e) => {
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
  };

  const { data: food = [], refetch: foodRefetch } = useQuery(
    ["food"],
    async () => {
      const res = await interceptor(`category/${id}`);
      return res.data;
    }
  );

  return (
    <>
      <Modal open={openModal} onClose={handleModalClose}>
        <ItemDetails handleModalClose={handleModalClose} item={item} />
      </Modal>
      <div className="h-[116vh] overflow-y-scroll">
        {food[0]?.foodItems_category?.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                width: "100%",
              },
            }}
          >
            <Paper
              sx={{
                marginX: 1,
                marginY: 2,
                padding: 3,
                boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 20%)",
              }}
            >
              <div className="md:space-y-0 space-y-5 md:flex md:gap-3 cursor-pointer relative">
                <div className="lg:flex md:flex flex-row items-center md:gap-8">
                  <img
                    className="md:w-36 md:h-36 w-20 h-20 object-contain"
                    onClick={() => handleModalOpen(item)}
                    src={item.image}
                    alt=""
                  />

                  <div className="">
                    <div onClick={() => handleModalOpen(item)}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {item.food_name}
                      </Typography>
                      <Typography
                        sx={{
                          width: { xs: 1, md: 500 },
                        }}
                        className="text-gray-500"
                      >
                        {item.food_detail.substr(0, 100) +
                          `${item.food_detail.length > 100 ? "..." : ""}`}
                      </Typography>
                    </div>
                    <div>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                        >
                          {Object.entries(item?.price).map((key) => (
                            <FormControlLabel
                              control={
                                <Radio
                                  style={{
                                    color: "#FFC446",
                                  }}
                                />
                              }
                              label={`${key[0]} (${key[1]} TK.)`}
                              name="size"
                              value={key[1]}
                              onChange={(e) => handleChange({ index, key })}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="absolute right-0 md:top-0 top-2">
                    <Typography
                      sx={{ fontSize: 10, fontWeight: "bold" }}
                      component="legend"
                    >
                      Review: {item.review}
                    </Typography>
                    <Rating
                      name="read-only"
                      defaultValue={item.review}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                  </div>
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
                    className="md:w-32 h-8 w-full text-sm font-bold rounded border border-gray-300 cursor-pointer bg-[#FFC446] absolute md:right-0 md:bottom-0 -bottom-8"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Paper>
          </Box>
        ))}
      </div>
    </>
  );
};

export default Food;
