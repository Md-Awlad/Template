import { Grid, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";

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
    <Box className="p-5">
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
