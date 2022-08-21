import { Box } from "@mui/system";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../Contexts/ContextProvider";
import { FiUpload } from "react-icons/fi";
import { Autocomplete, Grid, InputAdornment } from "@mui/material";

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

const AddFoodItem = ({ handleModalClose }) => {
  const topFilms = [
    { size: "6''" },
    { size: "9''" },
    { size: "12''" },
    { size: "large" },
    { size: "small" },
    { size: "1:3" },
    { size: "1:4" },
  ];

  const { currentColor, currentMode } = useStateContext();
  const [selectValue, setSelectValue] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ ...style, width: 600, height: 500, overflowY: "scroll" }}>
      <h2 className="text-xl font-bold pb-3 text-center">Add Food Item</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5">
          {/* --FoodName-- */}
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
              id="name"
              label="Food Name"
              type="text"
              error={Boolean(errors.name)}
              helperText={errors.name && "This name is required *"}
              {...register("name", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --price-- */}
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
              id="price"
              label="Price"
              type="number"
              error={Boolean(errors.price)}
              helperText={errors.price && "This price is required *"}
              {...register("price", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --size-- */}
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={topFilms.map((option) => option.size)}
              defaultValue={[topFilms[2].size]}
              filterSelectedOptions
              value={selectValue}
              onChange={(event, value) => setSelectValue(value)}
              renderInput={(params) => (
                <TextField {...params} label="Select Size" />
              )}
            />
          </Grid>
          {/* --img-- */}
          <Grid item xs={12} md={6}>
            <TextField
              id="companyLogo"
              type="file"
              label="Company Logo"
              required
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors.companyLogo)}
              helperText={errors.companyLogo && "Company Logo is required *"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FiUpload size={25} />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                accept: "image/*",
              }}
              {...register("companyLogo", { required: true })}
              sx={{
                width: 1,
                "& ::file-selector-button": {
                  display: "none",
                },
              }}
            />
          </Grid>
          {/* --ingredient-- */}
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
              id="ingredient"
              label="Base Ingredient"
              type="text"
              error={Boolean(errors.ingredient)}
              helperText={errors.ingredient && "This ingredient is required *"}
              {...register("ingredient", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --test-- */}
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
              id="test"
              label="Test"
              type="text"
              error={Boolean(errors.test)}
              helperText={errors.test && "This test is required *"}
              {...register("test", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --review-- */}
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
              id="review"
              label="Review"
              type="text"
              error={Boolean(errors.review)}
              helperText={errors.review && "This review is required *"}
              {...register("review", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --package-- */}
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
              id="package"
              label="Packaging"
              type="text"
              error={Boolean(errors.package)}
              helperText={errors.package && "This package is required *"}
              {...register("package", { required: true })}
              fullWidth
            />
          </Grid>
          <div className="flex justify-end">
            <button
              type="submit"
              style={{ backgroundColor: currentColor }}
              className="rounded drop-shadow-sm bg-primary mx-3 w-24 p-2 text-base font-semibold text-white outline-none"
            >
              Create
            </button>
            <button
              onClick={handleModalClose}
              className="w-24 p-2 rounded-md font-semibold text-white bg-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default AddFoodItem;
