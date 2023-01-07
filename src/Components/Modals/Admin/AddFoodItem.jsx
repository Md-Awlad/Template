import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";

const AddFoodItem = ({
  handleModalCloseTwo,
  categories,
  foodRefetch,
  customizeFood,
}) => {
  const { currentColor } = useStateContext();
  const [category, setCategory] = useState();
  const [extra, setExtra] = useState();
  const queryClient = useQueryClient();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      item: [{ title: "", price: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "item",
    control,
    rules: {
      required: "Please append at least 1 item",
    },
  });

  const { mutate: addFood } = useMutation(
    (payloadForm) =>
      toast.promise(
        myAxios.postForm("/food/", payloadForm, {
          headers: {
            "content-type": "multipart/form-data",
          },
        }),
        {
          pending: "Adding Foods...",
          success: "Food Added",
          error: "Error Adding Foods!",
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("food");
        handleModalCloseTwo();
        foodRefetch();
      },
    }
  );
  const onSubmit = async (data) => {
    const price = {};
    data.item?.forEach((item) => {
      if (item.title.endsWith('"')) {
        const a = item?.title?.replace(/"/g, " inch");
        price[a] = item.price;
      } else if (fields.length > 1) {
        price[item.title] = item.price;
      } else if (item.title && item.price) {
        price[item.title] = item.price;
      } else if (!item.title) {
        price["regular"] = item.price;
      }
    });

    const payloadForm = new FormData();
    payloadForm.append("food_name", data?.foodName);
    payloadForm.append("prices", `'${JSON.stringify(price)}'`);
    payloadForm.append("image", data?.image[0]);
    if (data?.package) {
      payloadForm.append("packaging", data?.package);
    }
    payloadForm.append("base_ingredient", data?.ingredient);

    payloadForm.append("category", category);
    if (extra?.length) {
      payloadForm.append(
        "custom_food",
        JSON.stringify(extra?.map((a) => a?.id))
      );
    }
    addFood(payloadForm);
  };

  return (
    <Box
      sx={{
        p: 5,
      }}
    >
      <h2 className="text-3xl font-bold pb-3 text-center">Add Food Item</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5">
          {/* --FoodName-- */}
          <Grid item xs={12} md={6}>
            <TextField
              id="foodName"
              label="Food Name"
              type="text"
              error={Boolean(errors.foodName)}
              {...register("foodName", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --size&price--*/}
          <Grid item xs={12}>
            <Button
              sx={{ width: "100%", backgroundColor: `${currentColor}` }}
              variant="contained"
              onClick={() => {
                append();
              }}
            >
              Add Size and Price
            </Button>
            {fields?.map((field, index) => {
              return (
                <Box
                  key={field.id}
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
                    required={fields.length > 1 ? true : false}
                    {...register(`${`item.${index}.title`}`)}
                    fullWidth
                  />
                  <TextField
                    label="Food Price"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    required
                    {...register(`item.${index}.price`, {
                      valueAsNumber: true,
                    })}
                    fullWidth
                  />
                  <AiOutlineClose
                    onClick={() => remove(index)}
                    className={`text-5xl cursor-pointer text-red-700 ${
                      index === 0 && "hidden"
                    }`}
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
          <Grid item xs={12} md={6}>
            <TextField
              id="ingredient"
              label="Base Ingredient"
              type="text"
              // value={ingredient}
              // onChange={(value) => setIngredient(value)}
              // error={Boolean(errors.ingredient)}
              // helperText={errors.ingredient && "This ingredient is required *"}
              {...register("ingredient")}
              fullWidth
            />
          </Grid>
          {/* --package-- */}
          <Grid item xs={12} md={6}>
            <TextField
              id="package"
              label="Packaging"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              // value={package2}
              // onChange={(value) => setPackage2(value)}
              {...register("package", { min: 0 })}
              fullWidth
            />
          </Grid>
          {/* --category-- */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                required
                // inputProps={{ required: true }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Categories"
                onChange={(e) => setCategory(e.target.value)}
                error={Boolean(errors.category)}
                helperText={errors.category && "This categories is required *"}
              >
                {categories?.map((category, index) => (
                  <MenuItem key={index} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* --extra-- */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              options={customizeFood?.map((custom) => custom)}
              getOptionLabel={(option) => option?.ingredient_name}
              filterSelectedOptions
              onChange={(_, newValue) => setExtra(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Customize Food" fullWidth />
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
