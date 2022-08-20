import React from "react";
import { Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useStateContext } from "../Contexts/ContextProvider";

const Setting = () => {
  const { currentColor } = useStateContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="bg-neutral dark:bg-secondary-dark-bg border-1 dark:border-gray-700 rounded-md shadow-sm md:mx-20 my-10 px-8 py-5 space-y-10">
      <h2 className="text-3xl font-semibold dark:text-neutral">Settings</h2>
      <div className="bg-neutral dark:bg-secondary-dark-bg border-1 dark:border-gray-700 rounded-md shadow-sm px-4 py-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* --changePass-- */}
          <Grid item xs={12}>
            <TextField
              id="passOne"
              label="Change Password"
              type="password"
              error={Boolean(errors.passOne)}
              helperText={errors.passOne && "Change password is required *"}
              {...register("passOne", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --addPass-- */}
          <Grid item xs={12}>
            <TextField
              id="addPass"
              label="Add New Password"
              type="password"
              error={Boolean(errors.addPass)}
              helperText={errors.addPass && "Add password is required *"}
              {...register("addPass", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --repeatPass-- */}
          <Grid item xs={12}>
            <TextField
              id="repeatPass"
              label="Repeat New Password"
              type="password"
              error={Boolean(errors.repeatPass)}
              helperText={errors.repeatPass && "Repeat password is required *"}
              {...register("repeatPass", { required: true })}
              fullWidth
            />
          </Grid>
          <div className="flex justify-end mt-16">
            <button
              style={{ backgroundColor: currentColor }}
              type="submit"
              className="rounded-md shadow md:mx-4 mx-2 px-8 py-2 text-sm font-medium text-white outline-none"
            >
              Apply
            </button>
            <button
              type="submit"
              className="rounded-md shadow px-8 py-2 text-sm font-medium bg-[#f13f3f] text-white outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
