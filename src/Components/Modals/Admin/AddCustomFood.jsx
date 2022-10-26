import { Box } from "@mui/system";
import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Autocomplete, Grid, InputAdornment, Tab, Tabs } from "@mui/material";
import { toast } from "react-toastify";
import { FiUpload } from "react-icons/fi";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";
import { useState } from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

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
  const [category, setCategory] = useState();
  const [selectTab, setSelectTab] = useState(false);
  const [food, setFood] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    const payload = {
      category: category?.map((a) => a.id),
      food: food?.map((a) => a.id),
      ingredient: data?.foodName,
      price: data?.foodPrice,
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
    <Box sx={{ ...style }}>
      <h2 className="text-xl font-bold pb-3">Add Custom Food</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Grid item xs={12}>
          <Tabs
            centered
            value={selectTab}
            onChange={(event, newValue) => {
              setSelectTab(newValue);
            }}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "6px",
              minHeight: "35px",
              "& button": {
                borderRadius: "5px",
              },
              "& button.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
            TabIndicatorProps={{
              hidden: true,
            }}
          >
            <Tab
              value={false}
              label="Category"
              sx={{ flexGrow: 1, p: 0, minHeight: "35px" }}
            />
            <Tab
              value={true}
              label="Food"
              sx={{ flexGrow: 1, p: 0, minHeight: "35px" }}
            />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {selectTab ? (
            <Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              options={foods?.map((food) => food)}
              getOptionLabel={(option) => option?.food_name}
              filterSelectedOptions
              onChange={(_, newValue) => setFood(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Food" fullWidth />
              )}
            />
          ) : (
            <Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              options={categories?.map((category) => category)}
              getOptionLabel={(option) => option?.name}
              filterSelectedOptions
              onChange={(_, newValue) => setCategory(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Categories" fullWidth />
              )}
            />
          )}
        </Grid>
        {/* --FoodName-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="foodName"
            label="Extra Ingredients Name"
            type="text"
            error={Boolean(errors.foodName)}
            helperText={errors.foodName && "This name field is required *"}
            {...register("foodName", { required: true })}
            fullWidth
          />
        </Grid>
        {/* --FoodName-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="foodPrice"
            label="Price"
            type="number"
            error={Boolean(errors.foodPrice)}
            helperText={errors.foodPrice && "This price field is required *"}
            {...register("foodPrice", { required: true })}
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
