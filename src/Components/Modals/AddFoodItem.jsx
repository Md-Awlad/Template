import { Box } from "@mui/system";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../Contexts/ContextProvider";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { Autocomplete, Button, Grid, InputAdornment } from "@mui/material";
import myAxios from "../../utils/myAxios";

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

const AddFoodItem = ({ handleModalCloseTwo, categories }) => {
  const { currentColor, currentMode } = useStateContext();
  const [variants, setVariants] = useState(1);
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [review, setReview] = useState();

  console.log(category);

  const id = categories?.map((category) => category.id);

  console.log(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const price = {};

    data.item?.forEach((item) => {
      price[item.title] = item.price;
    });

    console.log(price);

    const payloadForm = new FormData();
    payloadForm.append("food_name", data?.foodName);
    payloadForm.append("image", data?.image[0]);
    payloadForm.append("price", price);
    payloadForm.append("review", data?.review);
    payloadForm.append("is_recommended", data?.recommend);
    payloadForm.append("base_ingredient", data?.ingredient);
    payloadForm.append("taste", data?.taste);
    payloadForm.append("packaging", data?.package);
    payloadForm.append("category", Number(categoryId));

    for (let value of payloadForm) {
      console.log(value);
    }

    const response = await toast.promise(
      myAxios.post("/food/", payloadForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
      {
        pending: "Adding Foods...",
        success: "Food Added",
        error: "Error Adding Foods!",
      }
    );
    if (response.status === 500) {
      handleModalCloseTwo();
    }
  };

  return (
    <Box sx={{ ...style, width: 600, height: 500, overflowY: "scroll" }}>
      <h2 className="text-3xl font-bold pb-3 text-center">Add Food Item</h2>
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
              id="foodName"
              label="Food Name"
              type="text"
              // value={foodName}
              // onChange={(newValue) => {
              //   setFoodName(newValue);
              // }}
              error={Boolean(errors.foodName)}
              helperText={errors.foodName && "This food name is required *"}
              {...register("foodName", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --size&price-- */}
          <Grid item xs={12}>
            <Button
              sx={{ width: "100%", backgroundColor: `${currentColor}` }}
              variant="contained"
              onClick={() => setVariants((variants) => (variants += 1))}
            >
              Add Size and Price
            </Button>
            {new Array(variants).fill(null).map((item, index) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: 2,
                    marginTop: 2,
                  }}
                >
                  <TextField
                    label="Food Size"
                    type="text"
                    required
                    {...register(`item.${index + 1}.title`)}
                    fullWidth
                  />
                  <TextField
                    label="Food Price"
                    type="number"
                    required
                    {...register(`item.${index + 1}.price`)}
                    fullWidth
                  />
                </Box>
              );
            })}
          </Grid>
          {/* --img-- */}
          <Grid item xs={12} md={6}>
            <TextField
              id="image"
              type="file"
              label="Food Image"
              required
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors.image)}
              helperText={errors.image && "Food image is required *"}
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
              {...register("image", { required: true })}
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
              // value={ingredient}
              // onChange={(value) => setIngredient(value)}
              error={Boolean(errors.ingredient)}
              helperText={errors.ingredient && "This ingredient is required *"}
              {...register("ingredient", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --detail-- */}
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
              id="detail"
              label="Details"
              type="text"
              // value={detail}
              // onChange={(value) => setDetail(value)}
              error={Boolean(errors.detail)}
              helperText={errors.detail && "This food details is required *"}
              {...register("detail", { required: true })}
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
              id="taste"
              label="Taste"
              type="text"
              // value={taste}
              // onChange={(value) => setTaste(value)}
              error={Boolean(errors.taste)}
              helperText={errors.taste && "This taste is required *"}
              {...register("taste", { required: true })}
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
              value={review}
              onChange={(value) => setReview(value)}
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
              type="number"
              // value={package2}
              // onChange={(value) => setPackage2(value)}
              error={Boolean(errors.package)}
              helperText={errors.package && "This package is required *"}
              {...register("package", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --recommend-- */}
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
              id="recommend"
              label="Recommended"
              type="text"
              // value={recommend}
              // onChange={(value) => setRecommend(value)}
              error={Boolean(errors.recommend)}
              helperText={errors.recommend && "This recommend is required *"}
              {...register("recommend", { required: true })}
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
            <Autocomplete
              options={categories?.map((category) => category)}
              getOptionLabel={(option) => option.name || category}
              filterSelectedOptions
              value={category}
              onChange={(event, value) => {
                if (value) {
                  setCategory(value.name);
                  setCategoryId(value.id);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} id="size" label="Category" />
              )}
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
              onClick={handleModalCloseTwo}
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
