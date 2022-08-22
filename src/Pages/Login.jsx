import { Grid, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateContext } from "../Contexts/ContextProvider";
import myAxios from "../utils/myAxios";

const Login = () => {
  const { currentColor, currentMode, currentUser, currentPass } =
    useStateContext();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const res = await toast.promise(myAxios.post("/user/", data), {
        
      })
    } catch (error) {
      
    }
    console.log(data);
  };

  return (
    <div className="md:max-w-xl p-8 border border-gray-400 rounded-md m-auto my-16 shadow-2xl">
      <h2 className="text-center text-2xl font-semibold dark:text-neutral uppercase mb-8">
        login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* --email-- */}
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
            id="user"
            label="User Name"
            type="text"
            error={Boolean(errors.user)}
            helperText={errors.user && "This user is required *"}
            {...register("user", { required: true })}
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
        <div className="text-center">
          <button
            type="submit"
            style={{ backgroundColor: currentColor }}
            className="w-full px-3 py-2 rounded-md text-neutral text-lg uppercase"
          >
            login
          </button>
          <span className="text-sm font-bold text-gray-500 dark:text-neutral">
            You have no account?{" "}
            <Link
              to="/register"
              style={{ color: currentColor }}
              className="text-base"
            >
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
