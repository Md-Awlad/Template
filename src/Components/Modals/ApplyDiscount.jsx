import { Box } from "@mui/system";
import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../Contexts/ContextProvider";
import { Grid, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import myAxios from "../../utils/myAxios";
import { FiUpload } from "react-icons/fi";

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

const ApplyDiscount = ({ handleDiscountModalClose }) => {
  const { currentColor, currentMode } = useStateContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payloadForm = new FormData();
    payloadForm.append("discount", data?.discount);
    payloadForm.append("category", data?.category);
    payloadForm.append("food", data?.food);
    console.log(data);

    const response = await toast.promise(
      myAxios.post("/apply_discount/", payloadForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
      {
        pending: "Adding Categories...",
        success: "Categories Added",
        error: "Error Adding Categories!",
      }
    );
    if (response.status === 201) {
      handleDiscountModalClose();
    }
  };

  return (
    <Box sx={{ ...style }}>
      <h2 className="text-xl font-bold pb-3">Apply Discount</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* --discount-- */}
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
            id="discount"
            label="Discount Price"
            type="text"
            error={Boolean(errors.discount)}
            helperText={errors.discount && "This discount field is required *"}
            {...register("discount", { required: true })}
            fullWidth
          />
        </Grid>
        {/* --category-- */}
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
            id="category"
            label="Name of Category"
            type="text"
            error={Boolean(errors.category)}
            helperText={errors.category && "This category field is required *"}
            {...register("category", { required: true })}
            fullWidth
          />
        </Grid>
        {/* --food-- */}
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
            id="food"
            label="Name of Food"
            type="text"
            error={Boolean(errors.food)}
            helperText={errors.food && "This food field is required *"}
            {...register("food", { required: true })}
            fullWidth
          />
        </Grid>
        <button
          type="submit"
          style={{ backgroundColor: currentColor }}
          className="w-full px-8 py-2 rounded-md text-neutral text-lg uppercase"
        >
          apply
        </button>
      </form>
    </Box>
  );
};

export default ApplyDiscount;
