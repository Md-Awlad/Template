import { Box } from "@mui/system";
import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
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

const EditCustomFood = ({ handleClose, editId }) => {
  const { currentColor } = useStateContext();
  const { register, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    const payload = {
      ingredient_name: data?.extraName,
      price: data?.extraPrice,
    };
    console.log(payload);

    const response = await toast.promise(
      myAxios.patch(`/customize_food/${editId}/`, payload),
      {
        pending: "Edit Extra...",
        success: "Extra Added",
        error: "Error Edit Extra!",
      }
    );
    queryClient.invalidateQueries("customize_food");
    handleClose();
  };

  const { data } = useQuery(
    [`customize_food`],
    () => myAxios(`/customize_food/${editId}`),
    {
      onSuccess: ({ data }) => {
        setValue("extraName", data?.ingredient_name);
        setValue("extraPrice", data?.price);
      },
    }
  );

  return (
    <Box sx={{ ...style, width: { sm: 700, xs: 400 } }}>
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
