import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";

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
  const { currentColor } = useStateContext();
  const [status, setStatus] = useState(false);
  const [date, setDate] = useState(moment());
  const [selectTab, setSelectTab] = useState(false);
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
    payloadForm.append("name", data?.name);
    payloadForm.append("notice", data?.notice);
    payloadForm.append("amount", data?.amount);
    payloadForm.append("condition", data?.condition);
    payloadForm.append("is_fixed", status);
    payloadForm.append("expired_at", date.format("YYYY-MM-DD"));

   

    const response = await toast.promise(
      myAxios.post("/create_discount/", payloadForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
      {
        pending: "Adding Discount....",
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
    <Box
      sx={{
        p: 5,
      }}
    >
      <h2 className="text-xl font-bold pb-3">Add Discount</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* --name-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="name"
            label="Discount Name"
            type="text"
            error={Boolean(errors.name)}
            helperText={errors.name && "This name field is required *"}
            {...register("name", { required: true })}
            fullWidth
          />
        </Grid>
        {/* --notice-- */}
        <Grid item xs={12}>
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
              label="Conditional Discount"
              sx={{ flexGrow: 1, p: 0, minHeight: "35px" }}
            />
            <Tab
              value={true}
              label="Fixed Discount"
              sx={{ flexGrow: 1, p: 0, minHeight: "35px" }}
            />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {selectTab ? (
            <TextField
              id="amount"
              label="Amount"
              type="number"
              {...register("amount")}
              fullWidth
            />
          ) : (
            <Box className="grid grid-cols-2 gap-4">
              <TextField
                id="condition"
                label="Conditional Amount"
                type="number"
                {...register("condition")}
                fullWidth
              />
              <TextField
                id="amount"
                label="Amount"
                type="number"
                {...register("amount")}
                fullWidth
              />
            </Box>
          )}
        </Grid>
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
              <MenuItem value={true}>Fixed</MenuItem>
              <MenuItem value={false}>Parentage</MenuItem>
            </Select>
          </FormControl>
        </div>
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
