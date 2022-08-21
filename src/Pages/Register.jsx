import { Grid, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import logoImg from "../image/Business team meeting.svg";

const Register = () => {
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
    <div className="bg-neutral dark:bg-secondary-dark-bg border-1 dark:border-gray-700 rounded-md shadow-sm px-4 py-5 my-10">
      <div className="grid lg:grid-cols-2 gap-4">
        {/* --logo-- */}
        <div className="space-y-5 rounded-md px-4 py-5">
          <h2 className="text-xl font-medium dark:text-neutral">
            Welcome to <span className="text-[#FFC446] text-3xl font-bold">Neuvemi</span>
          </h2>
          <img src={logoImg} alt="" />
        </div>
        {/* --form-- */}
        <div className="space-y-5 border-2 border-dashed dark:border-gray-700 rounded-md px-4 py-5">
          <h2 className="text-center text-2xl font-semibold dark:text-neutral uppercase">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* --name-- */}
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Name"
                type="text"
                error={Boolean(errors.name)}
                helperText={errors.name && "This name is required *"}
                {...register("name", { required: true })}
                fullWidth
              />
            </Grid>
            {/* --email-- */}
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email"
                type="email"
                error={Boolean(errors.email)}
                helperText={errors.email && "This email is required *"}
                {...register("email", { required: true })}
                fullWidth
              />
            </Grid>
            {/* --phone-- */}
            <Grid item xs={12}>
              <TextField
                id="phone"
                label="Phone"
                type="number"
                error={Boolean(errors.phone)}
                helperText={errors.phone && "This phone is required *"}
                {...register("phone", { required: true })}
                fullWidth
              />
            </Grid>
            {/* --pass-- */}
            <Grid item xs={12}>
              <TextField
                id="pass"
                label="Password"
                type="password"
                error={Boolean(errors.pass)}
                helperText={errors.pass && "This password is required *"}
                {...register("pass", { required: true })}
                fullWidth
              />
            </Grid>
            <div className="text-center space-y-3">
              <h2 className="text-xl text-gray-500 dark:text-neutral font-semibold">
                Sign Up With
              </h2>
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
      </div>
    </div>
  );
};

export default Register;
