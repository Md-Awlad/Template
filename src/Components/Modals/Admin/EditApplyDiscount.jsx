import { Box } from "@mui/system";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { toast } from "react-toastify";
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import myAxios from "../../../utils/myAxios";
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

const EditApplyDiscount = ({ editId, handleClose, categories, foods }) => {
  console.log(categories?.map((a) => a.name));
  const { currentColor, currentMode } = useStateContext();
  const [date, setDate] = useState(moment());
  const [status, setStatus] = useState("");
  const [food, setFood] = useState("");
  const [category, setCategory] = useState();

  const queryClient = useQueryClient();
  const { handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      //   discount: discount?.map((a) => a.id),
      name: category?.map((a) => a.id),
      food_name: food?.map((a) => a.id),
      expired_at: date,
      is_active: status,
    };

    console.log(payload);

    const response = await toast.promise(
      myAxios.patch(`/apply_discount/${editId}/`, payload),
      {
        pending: "Editing Discount....",
        success: "Discount Added",
        error: "Error Editing Discount!",
      }
    );
    queryClient.invalidateQueries("discounts");
    handleClose();
  };

  const { data } = useQuery(
    ["discount"],
    () => myAxios(`/apply_discount/${editId}`),
    {
      onSuccess: ({ data: discounts = [] }) => {
        console.log(discounts);
        discounts?.food?.map((food) => {
          setValue("food", food?.food_name);
        });
        discounts?.discount?.map((food) => {
          setValue("amount", food?.amount);
        });
        setStatus(discounts?.is_active);
        setDate(discounts?.expired_at);
      },
    }
  );

  //   const data = discount?.category?.map((categories) => categories);

  return (
    <Modal open={Boolean(editId)} onClose={handleClose}>
      <Box sx={{ ...style, width: 600 }}>
        <h2 className="text-3xl font-bold pb-3 text-center">
          Edit Apply Discount
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* <div className="grid grid-cols-2 gap-4"> */}
          {/* --category-- */}
          <Grid
          
            item
            xs={12}
            md={6}
          >
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
          <Grid
        
            item
            xs={12}
            md={6}
          >
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
          {/* </div> */}
          <div className="grid grid-cols-2 gap-4">
            {/* --date-- */}
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
            {/* <--Status--> */}
            <FormControl fullWidth>
              <InputLabel id="selectLabelId">Active</InputLabel>
              <Select
                labelId="selectLabelId"
                id="selectId"
                InputLabelProps={{ shrink: true }}
                size="small"
                value={status}
                // {...register("status")}
                label="Fixed"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* --amount-- */}
          {/* <Grid
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
              id="amount"
              InputLabelProps={{ shrink: true }}
              label="Amount"
              type="number"
              {...register("amount")}
              fullWidth
            />
          </Grid> */}
          <button
            type="submit"
            style={{ backgroundColor: currentColor }}
            className="w-full px-8 py-2 rounded-md text-neutral text-lg uppercase"
          >
            Update
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditApplyDiscount;
