import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";

const EditCustomFood = ({ handleClose, editCustomFood }) => {
  const { currentColor } = useStateContext();
  const { register, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    const payload = {
      ingredient_name: data?.extraName,
      price: data?.extraPrice,
    };

    await toast.promise(
      myAxios.patch(`/customize_food/${editCustomFood?.id}/`, payload),
      {
        pending: "Edit Extra...",
        success: "Extra Added",
        error: "Error Edit Extra!",
      }
    );
    queryClient.invalidateQueries("customize_food");
    handleClose();
  };

  React.useEffect(() => {
    setValue("extraName", editCustomFood?.ingredient_name);
    setValue("extraPrice", editCustomFood?.price);
  }, [editCustomFood]);

  return (
    <Box className="p-5">
      <h2 className="text-xl font-bold pb-3">Edit Custom Food</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* --Extra Name-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="extraName"
            label="Extra Ingredients Name"
            type="text"
            InputLabelProps={{ shrink: true }}
            {...register("extraName")}
            fullWidth
          />
        </Grid>
        {/* --Extra Price-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="extraPrice"
            label="Extra Ingredients Price"
            type="number"
            InputLabelProps={{ shrink: true }}
            {...register("extraPrice")}
            fullWidth
          />
        </Grid>
        <div className="flex justify-end">
          <button
            type="submit"
            style={{ backgroundColor: currentColor }}
            className="rounded drop-shadow-sm bg-primary mx-3 w-24 p-2 text-base font-semibold text-white outline-none"
          >
            Update
          </button>
          <button
            onClick={handleClose}
            className="w-24 p-2 rounded-md font-semibold text-white bg-red-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </Box>
  );
};

export default EditCustomFood;
