import { Box } from "@mui/system";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../Contexts/ContextProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { Grid } from "@mui/material";

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

const AddCategory = ({ handleModalClose }) => {
  const { currentColor, currentMode } = useStateContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ ...style }}>
      <h2 className="text-xl font-bold pb-3">Add Category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
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
              helperText={
                errors.category && "This category field is required *"
              }
              {...register("category", { required: true })}
              fullWidth
            />
          </Grid>
          <button
            type="submit"
            style={{ backgroundColor: currentColor }}
            className="h-14 px-8 py-2 rounded-md text-neutral text-lg uppercase"
          >
            add
          </button>
        </div>
      </form>
    </Box>
  );
};

export default AddCategory;
