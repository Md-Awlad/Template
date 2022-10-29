import { Box } from "@mui/system";
import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { Autocomplete, Grid } from "@mui/material";
import { toast } from "react-toastify";
import myAxios from "../../../utils/myAxios";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";

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

const ApplyDiscount = ({
  discounts,
  categories,
  foods,
  handleDiscountModalClose,
}) => {
  const { currentColor } = useStateContext();
  const [discount, setDiscount] = useState();
  const [category, setCategory] = useState();
  const [food, setFood] = useState();
  const [date, setDate] = useState(moment());
  const queryClient = useQueryClient();
  console.log(discounts);
  const { handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      discount: discount?.map((a) => a.id),
      category: category?.map((a) => a.id),
      food: food?.map((a) => a.id),
      date: date?.expired_at,
    };

    const response = await toast.promise(
      myAxios.post("/apply_discount/", payload),
      {
        pending: "Adding Discounts...",
        success: "Discounts Added",
        error: "Error Adding Discounts!",
      }
    );
    queryClient.invalidateQueries("apply_discount");
    handleDiscountModalClose();
  };

  return (
    <Box sx={{ ...style, width: { sm: 700, xs: 400 } }}>
      <h2 className="text-xl font-bold pb-3">Apply Discount</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* --discount-- */}
        <Grid item xs={12} md={6}>
          <Autocomplete
            multiple
            disablePortal
            id="combo-box-demo"
            options={discounts?.map((discount) => discount)}
            getOptionLabel={(option) => option?.name}
            filterSelectedOptions
            onChange={(_, newValue) => setDiscount(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Discount Name" fullWidth />
            )}
          />
        </Grid>
        {/* --category-- */}
        <Grid item xs={12} md={6}>
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
        </Grid>
        {/* --food-- */}
        <Grid item xs={12} md={6}>
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
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            id="date"
            label="Expired Date"
            value={date}
            onChange={(newValue) => {
              setDate(moment(newValue));
            }}
            renderInput={(params) => (
              <TextField size="small" fullWidth {...params} />
            )}
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
