import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

const EditDiscount = ({ editId, handleClose }) => {
  const { currentColor } = useStateContext();
  const [date, setDate] = useState(moment());
  const [status, setStatus] = useState("");

  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    const payloadForm = new FormData();
    payloadForm.append("notice", data?.notice);
    payloadForm.append("amount", data?.amount);
    payloadForm.append("condition", data?.condition);
    payloadForm.append("is_fixed", status);
    payloadForm.append("expired_at", date);

    await toast.promise(
      myAxios.patch(`/create_discount/${editId}/`, payloadForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
      {
        pending: "Editing Discount....",
        success: "Discount Added",
        error: "Error Editing Discount!",
      }
    );
    queryClient.invalidateQueries("discounts");
    handleClose();
  };

  useQuery([`discounts`, editId], () => myAxios(`/create_discount/${editId}`), {
    onSuccess: ({ data: discount = [] }) => {
      setValue("notice", discount?.notice);
      setValue("amount", discount?.amount);
      setValue("condition", discount?.condition);
      setStatus(discount?.is_fixed);
      setDate(discount?.expired_at);
    },
  });

  return (
    <Modal open={Boolean(editId)} onClose={handleClose}>
      <Box sx={{ ...style, width: { sm: 700, xs: 400 } }}>
        <h2 className="text-3xl font-bold pb-3 text-center">Edit Discount</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {/* --notice-- */}
            <Grid item xs={12} md={6}>
              <TextField
                id="notice"
                InputLabelProps={{ shrink: true }}
                label="Notice"
                type="text"
                {...register("notice")}
                fullWidth
              />
            </Grid>
            {/* --amount-- */}
            <Grid item xs={12} md={6}>
              <TextField
                id="amount"
                InputLabelProps={{ shrink: true }}
                label="Amount"
                type="number"
                {...register("amount")}
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
                  setDate(moment(newValue));
                }}
                renderInput={(params) => (
                  <TextField size="small" fullWidth {...params} />
                )}
              />
            </Grid>
            {/* <--Status--> */}
            <FormControl fullWidth>
              <InputLabel id="selectLabelId">Fixed</InputLabel>
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
          {/* --condition-- */}
          <Grid item xs={12} md={6}>
            <TextField
              id="condition"
              InputLabelProps={{ shrink: true }}
              label="Conditional Amount"
              type="number"
              {...register("condition")}
              fullWidth
            />
          </Grid>
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

export default EditDiscount;
