import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "@mui/material";
import { useMutation, } from "@tanstack/react-query";
import interceptor from "../../../utils/interceptors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #fff",
  borderRadius: "5px",
  boxShadow: 24,
  pt: 2,
  px: 2,
  pb: 3,
};

const OrderInfo = ({
  modalOpen,
  handleModalClose,
  cart,
  setCart,
  orderType,
  name,
  phoneNumber,
}) => {

  const {
    handleSubmit,
  } = useForm();

  const orderConfirmMutation = useMutation(
    (payload) => interceptor.post("/order/", payload),
    {
      onSuccess: () => {
        setCart([]);
      },
    }
  );

  const onSubmit = async (data) => {
    console.log(data);
    const payload = {
      order_type: "takeaway",
      order_items: cart.map((item) => {
        return {
          id: item.id,
          quantity: item.count,
          price: item.size,
          extra: item?.extra ? Object.keys(item?.extra) : [],
        };
      }),

      name: data?.name,
      phone: data?.phone,
    };
    orderConfirmMutation.mutate(payload);
  };

  return (
    <Modal open={Boolean(modalOpen)}>
      <Box
        sx={{
          ...style,
          width: { md: 600, xs: 350 },
          // height: { md: 500, xs: 400 },
          overflowY: "scroll",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <h2 className="text-2xl text-center font-semibold pt-5">
              Order Summary
            </h2>
            <hr className="text-gray-900 w-64 m-auto" />
            <div className="h-96 overflow-scroll space-y-5">
              {cart?.map((item,index) => (
                <div key={index} className="space-y-1 grid grid-cols-2">
                  <div>
                    <h2>Food Id</h2>
                    <h2>Name</h2>
                    <h2>Phone Number</h2>
                    <h2>Food Name</h2>
                    <h2>Food Size</h2>
                    <h2>Order Number</h2>
                    <h2>Extra Ingredients</h2>
                    <h2>Packaging</h2>
                    <h2>Order Type</h2>
                    <h2>Amount</h2>
                    <h2>Total Amount</h2>
                  </div>
                  <div>
                    <h2>{item.id}</h2>
                    <h2>{name}</h2>
                    <h2>{phoneNumber}</h2>
                    <h2>{item.food_name}</h2>
                    <h2>{item.size}</h2>
                    <h2>{item.count}</h2>
                    <h2>
                      {Number(
                        item?.extra
                          ? Object.values(item?.extra)?.reduce(
                              (a, b) => a + b,
                              0
                            )
                          : 0
                      )}
                    </h2>
                    <h2>{item.packaging} Tk</h2>

                    <h2>{orderType}</h2>
                    <h2>
                      {item?.price
                        ? Number(item?.price * item?.count) +
                          item.packaging +
                          Number(
                            item?.extra
                              ? Object.values(item?.extra)?.reduce(
                                  (a, b) => a + b,
                                  0
                                )
                              : 0
                          )
                        : 0}
                    </h2>
                    <h2 className="text-lg font-semibold">
                      {Boolean(cart.length)
                        ? cart
                            .map(
                              (item) =>
                                item?.count * item?.price +
                                item.packaging +
                                Number(
                                  item?.extra
                                    ? Object.values(item?.extra)?.reduce(
                                        (a, b) => a + b,
                                        0
                                      )
                                    : 0
                                )
                            )
                            .reduce((a, b) => a + b, 0)
                        : 0}{" "}
                      Tk
                    </h2>
                  </div>
                </div>
              ))}
            </div>

            <div className=""></div>
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  ":hover": {
                    backgroundColor: "#FFC446",
                    borderColor: "#FFC446",
                  },
                  backgroundColor: "#FFC446",
                  borderColor: "#FFC446",
                  width: 100,
                  height: 40,
                  color: "#000",
                  mx: 2,
                }}
              >
                Confirm
              </Button>
              <Button
                onClick={handleModalClose}
                variant="outlined"
                sx={{
                  ":hover": {
                    backgroundColor: "red",
                    borderColor: "red",
                  },
                  backgroundColor: "red",
                  borderColor: "red",
                  width: 100,
                  height: 40,
                  color: "#fff",
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default OrderInfo;
