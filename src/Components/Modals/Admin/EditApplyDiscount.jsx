import {
  Autocomplete,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";
import { CustomModal } from "../../Shared/SharedStyles";

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

const EditApplyDiscount = ({
  allData,
  discounts,
  applyDiscount,
  editId,
  handleClose,
  categories,
  foods,
  dataIsLoading,
}) => {
  const { currentColor } = useStateContext();
  const [date, setDate] = useState(moment());
  const [status, setStatus] = useState("");

  const [discountName, setDiscountName] = useState([...allData?.discount]);
  const [category, setCategory] = useState([...allData?.category]);
  const [food, setFood] = useState([...allData.food]);

  const queryClient = useQueryClient();
  const { handleSubmit, setValue } = useForm();
  const onSubmit = async (data) => {
    const payload = {
      discount: discountName?.map((a) => a.id),
      name: category?.map((a) => a.id),
      food_name: food?.map((a) => a.id),
      expired_at: date,
      is_active: status,
    };

    await toast.promise(myAxios.patch(`/apply_discount/${editId}/`, payload), {
      pending: "Editing Discount....",
      success: "Discount Added",
      error: "Error Editing Discount!",
    });
    queryClient.invalidateQueries("apply_discount");
    handleClose();
  };
  React.useEffect(() => {
    // allData?.food?.map((food) => {
    //   setValue("food", food?.food_name);
    // });
    // allData?.discount?.map((food) => {
    //   setValue("amount", food?.amount);
    // });
    setStatus(allData?.is_active);
    setDate(allData?.expired_at);
  }, [editId]);
  console.log(discountName);

  return (
    <CustomModal open={Boolean(editId)} onClose={handleClose}>
      <Box sx={{ p: 5 }}>
        <h2 className="text-3xl font-bold pb-3 text-center">
          Edit Apply Discount
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* ---discount name--- */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              fullWidth
              disablePortal
              multiple
              loading={dataIsLoading}
              id="fixed-tags-demo"
              value={discountName}
              onChange={(event, newValue) => {
                setDiscountName([...newValue]);
              }}
              options={discounts?.map((discount) => discount)}
              getOptionLabel={(option) => option?.name}
              filterSelectedOptions
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip label={option.name} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Discount Name"
                  variant="outlined"
                  placeholder="Favorites"
                  fullWidth
                />
              )}
            />
          </Grid>
          {/* --category-- */}
          <Grid item xs={12} md={6}>
            {/* <Autocomplete
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
            /> */}
            <Autocomplete
              fullWidth
              disablePortal
              multiple
              loading={dataIsLoading}
              id="fixed-tags-demo"
              value={category}
              onChange={(event, newValue) => {
                setCategory([
                  // ...fixedOptions,
                  ...newValue,
                  // .filter(
                  //   (option) => fixedOptions.indexOf(option) === -1
                  // ),
                ]);
              }}
              options={categories?.map((category) => category)}
              getOptionLabel={(option) => option?.name}
              filterSelectedOptions
              // options={allData.category ? allData.category : null}
              // getOptionLabel={(option) => option.name}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })}
                    // disabled={fixedOptions.indexOf(option) !== -1}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  variant="outlined"
                  placeholder="Favorites"
                  fullWidth
                />
              )}
            />
          </Grid>
          {/* --food-- */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              fullWidth
              disablePortal
              multiple
              loading={dataIsLoading}
              id="fixed-tags-demo"
              value={food}
              onChange={(event, newValue) => {
                setFood([
                  // ...fixedOptions,
                  ...newValue,
                  // .filter(
                  //   (option) => fixedOptions.indexOf(option) === -1
                  // ),
                ]);
              }}
              options={foods ? foods : null}
              getOptionLabel={(option) => option.food_name}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={option.food_name}
                    {...getTagProps({ index })}
                    // disabled={fixedOptions.indexOf(option) !== -1}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Food"
                  variant="outlined"
                  placeholder="Favorites"
                  fullWidth
                />
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
                label="Active"
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
    </CustomModal>
  );
};

export default EditApplyDiscount;
