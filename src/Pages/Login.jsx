import { Grid, InputAdornment, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";
import { useStateContext } from "../Contexts/ContextProvider";
import { setAccessToken, setRefreshToken } from "../utils/localStorages";
import myAxios from "../utils/myAxios";
import { FiLogIn } from "react-icons/fi";

const Login = () => {
  const { currentColor, currentMode } = useStateContext();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await toast.promise(myAxios.post("/token/", data), {
        pending: "Signing in...",
        success: "Welcome back!",
        error: "Sign in failed",
      });
      if (res?.status === 200) {
        setAccessToken(res?.data?.access);
        setRefreshToken(res?.data?.refresh);
        queryClient.invalidateQueries(["currentUser"]);
      }
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.detail) {
        setError("username", {
          type: "custom",
          message: error?.response?.data?.detail,
        });
        setValue("password", "");
      }
    }
  };

  return (
    <div className="md:max-w-xl p-8 border border-gray-400 rounded-md m-auto my-16 shadow-2xl">
      <FiLogIn
        style={{ color: currentColor }}
        className="text-7xl m-auto mb-8"
      />
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
            fullWidth
            size="small"
            label="Your Username"
            error={Boolean(errors.username)}
            helperText={
              errors.username &&
              (errors.username.message || "Username is required")
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUserAlt className="inline text-xs" />
                </InputAdornment>
              ),
            }}
            {...register("username", { required: true })}
          />
        </Grid>
        {/* --pass-- */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Your Password"
            type="password"
            error={Boolean(errors.password)}
            helperText={
              errors.password &&
              (errors.password.message || "Password is required")
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUserAlt className="inline text-xs" />
                </InputAdornment>
              ),
            }}
            {...register("password", { required: true })}
          />
        </Grid>
        <div className="text-center">
          <button
            type="submit"
            style={{ backgroundColor: currentColor }}
            className="w-full px-3 py-1 rounded-md text-neutral text-lg uppercase"
          >
            login
          </button>
          {/* <span className="text-sm font-bold text-gray-500 dark:text-neutral">
            You have no account?{" "}
            <Link
              to="/register"
              style={{ color: currentColor }}
              className="text-base"
            >
              Register
            </Link>
          </span> */}
        </div>
      </form>
    </div>
  );
};

export default Login;
