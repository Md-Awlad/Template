import { Box } from "@mui/system";
import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../Contexts/ContextProvider";
import { Grid, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import myAxios from "../../utils/myAxios";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

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

const AddDiscount = () => {
  const { currentColor, currentMode } = useStateContext();
  const [date, setDate] = useState(moment());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ ...style }}>
      <h2 className="text-xl font-bold pb-3">Add Discount</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* --notice-- */}
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
            id="notice"
            label="Notice"
            type="text"
            error={Boolean(errors.notice)}
            helperText={errors.notice && "This notice field is required *"}
            {...register("notice", { required: true })}
            fullWidth
          />
        </Grid>
        {/* --amount-- */}
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
            id="amount"
            label="Amount"
            type="text"
            error={Boolean(errors.amount)}
            helperText={errors.amount && "This amount field is required *"}
            {...register("amount", { required: true })}
            fullWidth
          />
        </Grid>
        {/* --condition-- */}
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
            id="condition"
            label="Conditional Amount"
            type="text"
            error={Boolean(errors.condition)}
            helperText={errors.amount && "This condition field is required *"}
            {...register("condition", { required: true })}
            fullWidth
          />
        </Grid>
        {/* --date-- */}
        <Grid item xs={12} md={6}>
          <DatePicker
            id="endDate"
            label="End Date"
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
          add
        </button>
      </form>
    </Box>
  );
};

export default AddDiscount;
