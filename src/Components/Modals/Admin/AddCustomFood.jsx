import { Box } from "@mui/system";
import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";
import { useQueryClient } from "@tanstack/react-query";

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

const AddCustomFood = ({ handleModalClose, categories, foods }) => {
  const { currentColor } = useStateContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    const payload = {
      ingredient_name: data?.extraName,
      price: data?.extraPrice,
    };
    console.log(payload);

    const response = await toast.promise(
      myAxios.post("/customize_food/", payload),
      {
        pending: "Adding Extra...",
        success: "Extra Added",
        error: "Error Adding Extra!",
      }
    );
    queryClient.invalidateQueries("customize_food");
    handleModalClose();
  };

  return (
    <Box sx={{ ...style, width: { sm: 700, xs: 400 } }}>
      <h2 className="text-xl font-bold pb-3">Add Custom Food</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* --Extra Name-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="extraName"
            label="Extra Ingredients Name"
            type="text"
            error={Boolean(errors.extraName)}
            helperText={errors.extraName && "This name field is required *"}
            {...register("extraName", { required: true })}
            fullWidth
          />
        </Grid>
        {/* --Extra Price-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="extraPrice"
            label="Extra Ingredients Price"
            type="number"
            error={Boolean(errors.extraPrice)}
            helperText={errors.extraPrice && "This price field is required *"}
            {...register("extraPrice", { required: true })}
            fullWidth
          />
        </Grid>
        <button
          type="submit"
          style={{ backgroundColor: currentColor }}
          className="w-full px-8 py-2 rounded-md text-neutral text-lg uppercase"
        >
          add
        </button>
      </form>
    </Box>
  );
};

export default AddCustomFood;
