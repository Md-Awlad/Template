import { Box } from "@mui/system";
import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Grid, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import { FiUpload } from "react-icons/fi";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";

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

const AddCategory = ({ handleModalClose, categoryRefetch }) => {
  const { currentColor } = useStateContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payloadForm = new FormData();
    payloadForm.append("name", data?.category);
    if (data?.image[0]) {
      payloadForm.append("image", data?.image[0]);
    }
    const response = await toast.promise(
      myAxios.post("/category/", payloadForm, {
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
      handleModalClose();
      categoryRefetch();
    }
  };

  return (
    <Box sx={{ ...style ,width: { sm: 700, xs: 400 }}}>
      <h2 className="text-xl font-bold pb-3">Add Category</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Grid item xs={12} md={6}>
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

        {/* --img-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="image"
            type="file"
            label="Image"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                  <FiUpload size={25} />
                </InputAdornment>
              ),
            }}
            inputProps={{
              accept: "image/*",
            }}
            {...register("image")}
            sx={{
              width: 1,
              "& ::file-selector-button": {
                display: "none",
              },
            }}
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

export default AddCategory;
