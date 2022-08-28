import { Grid, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import logoImg from "../image/Business team meeting.svg";

const Register = () => {
  const { currentColor, currentMode } = useStateContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="md:max-w-xl p-8 border border-gray-400 rounded-md m-auto my-16 shadow-2xl">
      <h2 className="text-center text-2xl font-semibold dark:text-neutral uppercase mb-8">
        sign up
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* --user-- */}
        <Grid
          sx={{
            "& .MuiInputBase-root": {
              color: `${currentMode === "Light" ? "#000" : "#fff"}`,
              borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
            },
          }}
          item
          xs={12}
        >
          <TextField
            id="username"
            label="User Name"
            type="text"
            error={Boolean(errors.username)}
            helperText={errors.username && "This user is required *"}
            {...register("username", { required: true })}
            fullWidth
          />
        </Grid>
        {/* --pass-- */}
        <Grid item xs={12}>
          <TextField
            id="password"
            label="Password"
            type="password"
            error={Boolean(errors.password)}
            helperText={errors.password && "This password is required *"}
            {...register("password", { required: true })}
            fullWidth
          />
        </Grid>
        <div className="text-center">
          <div>
            <button
              type="submit"
              style={{ backgroundColor: currentColor }}
              className="w-full px-3 py-2 rounded-md text-neutral text-lg"
            >
              Create Account
            </button>
            <span className="text-sm font-bold text-gray-500 dark:text-neutral">
              Already your have account?{" "}
              <Link
                to="/login"
                style={{ color: currentColor }}
                className="text-base"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
