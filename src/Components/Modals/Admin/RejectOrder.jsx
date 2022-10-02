import { Box } from "@mui/system";
import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Button, Grid, TextareaAutosize, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
  px: 4,
  pb: 3,
};

const RejectOrder = ({ reject, handleModalClose }) => {
  const { currentColor, currentMode } = useStateContext();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    const payloadForm = {
      order_id: data?.orderId,
      email: data?.email,
      subject: data?.subject,
      message: data?.message,
    };

    console.log(payloadForm);

    const response = await toast.promise(
      myAxios.patch("/order_cancel/", payloadForm),
      {
        pending: "Cancel Foods...",
        success: "Cancel Successfully",
        error: "Error Cancel Foods!",
      }
    );
    queryClient.invalidateQueries("orders");
    handleModalClose();
  };

  const { data } = useQuery([`orders`], () => myAxios(`/order/${reject}`), {
    onSuccess: ({ data: orderFood = [] }) => {
      console.log(orderFood?.id);
      setValue("orderId", orderFood?.id);
      setValue("email", orderFood?.email);
    },
  });

  return (
    <Box sx={{ ...style }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Cancel Food
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Grid
          sx={{
            "& .MuiInputBase-root": {
              color: `${currentMode === "Light" ? "#000" : "#fff"}`,
              borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
            },
          }}
          item
          xs={12}
          md={6}
        >
          <TextField
            InputLabelProps={{ shrink: true }}
            id="orderId"
            label="Order ID"
            type="text"
            {...register("orderId")}
            fullWidth
          />
        </Grid>
        {/* --email-- */}
        <Grid
          sx={{
            "& .MuiInputBase-root": {
              color: `${currentMode === "Light" ? "#000" : "#fff"}`,
              borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
            },
          }}
          item
          xs={12}
          md={6}
        >
          <TextField
            InputLabelProps={{ shrink: true }}
            id="email"
            label="Email"
            type="email"
            {...register("email")}
            fullWidth
          />
        </Grid>
        {/* --subject-- */}
        <Grid
          sx={{
            "& .MuiInputBase-root": {
              color: `${currentMode === "Light" ? "#000" : "#fff"}`,
              borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
            },
          }}
          item
          xs={12}
          md={6}
        >
          <TextField
            id="subject"
            label="Subject"
            type="text"
            error={Boolean(errors.subject)}
            helperText={errors.subject && "This subject is required *"}
            {...register("subject")}
            fullWidth
          />
        </Grid>
        {/* --message-- */}
        <Grid item xs={12} md={6}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Write your opinion/suggestion"
            style={{
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "12px",
            }}
            error={Boolean(errors.message)}
            helperText={errors.message && "This message is required *"}
            {...register("message")}
          />
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            type="submit"
            style={{ backgroundColor: currentColor }}
            variant="contained"
          >
            Rejected
          </Button>
          <Button
            onClick={handleModalClose}
            style={{ backgroundColor: currentColor }}
            variant="contained"
          >
            Close
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RejectOrder;
