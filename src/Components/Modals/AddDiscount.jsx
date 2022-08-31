import { Box } from "@mui/system";
import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../Contexts/ContextProvider";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
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

const AddDiscount = ({ handleModalClose, discountRefetch }) => {
  const { currentColor, currentMode } = useStateContext();
  const [status, setStatus] = useState(false);
  const [date, setDate] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const onSubmit = async (data) => {
    const payloadForm = new FormData();
    payloadForm.append("notice", data?.notice);
    payloadForm.append("amount", data?.amount);
    payloadForm.append("condition", data?.condition);
    payloadForm.append("is_fixed", status);
    payloadForm.append("expired_at", date);

    for (const value of payloadForm.values()) {
      console.log(value);
    }

    const response = await toast.promise(
      myAxios.post("/create_discount/", payloadForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
      {
        pending: "Adding Discount...",
        success: "Discount Added",
        error: "Error Adding Discount!",
      }
    );
    if (response.status === 201) {
      handleModalClose();
      discountRefetch();
    }
  };

  return (
    <Box sx={{ ...style }}>
      <h2 className="text-xl font-bold pb-3">Add Discount</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
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
              type="number"
              error={Boolean(errors.amount)}
              helperText={errors.amount && "This amount field is required *"}
              {...register("amount", { required: true })}
              fullWidth
            />
          </Grid>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* --date-- */}
          <Grid item xs={12} md={6}>
            <DatePicker
              id="date"
              label="Expired Date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => (
                <TextField size="small" fullWidth {...params} />
              )}
            />
          </Grid>
          {/* <--Status--> */}
          <FormControl fullWidth>
            <InputLabel id="selectLabelId">Status</InputLabel>
            <Select
              labelId="selectLabelId"
              id="selectId"
              size="small"
              error={Boolean(errors.status)}
              value={status}
              helperText={errors.status && " status is required *"}
              {...register("status", { required: true })}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>
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
            type="number"
            error={Boolean(errors.condition)}
            helperText={
              errors.condition && "This condition field is required *"
            }
            {...register("condition", { required: true })}
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

export default AddDiscount;
