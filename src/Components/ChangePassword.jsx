import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import myAxios from "../utils/myAxios";
const ChangePassword = ({ handleClose }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);

  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passwordMutation = useMutation(
    (payload) =>
      toast.promise(myAxios.patch("/change-password/", payload), {
        pending: "Changing Password...",
        success: "Password Changed Successfully",
        error: "Error Changing Password",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["currentUser"]);
        handleClose();
      },
      onError: (error) => {
        if (error.response.status !== 500) {
          const errors = Object.values(error?.response?.data);
          errors.length && errors.forEach((error) => toast.error(error[0]));
        }
      },
    }
  );

  const onSubmit = (payload) => {
    passwordMutation.mutate(payload);
  };

  return (
    <Paper
      className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral"
      elevation={1}
      sx={{
        padding: 2,
      }}
    >
      <Typography variant="h6">Change Your Password</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 2,
          gap: 2,
        }}
      >
        <TextField
          name="old_password"
          label="Old Password"
          variant="outlined"
          size="small"
          type="password"
          fullWidth
          error={Boolean(errors.old_password)}
          helperText={errors.old_password && "Old Password is required"}
          {...register("old_password", { required: true })}
        />
        <TextField
          name="password"
          label="New Password"
          variant="outlined"
          size="small"
          fullWidth
          type={passwordVisible ? "text" : "password"}
          error={Boolean(errors.password)}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                component={IconButton}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </InputAdornment>
            ),
          }}
          helperText={
            errors.password &&
            (errors.password.message || "New Password is required")
          }
          {...register("password", {
            required: true,
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                "Password must contain minimum eight characters, at least one capital letter, one small letter and one number",
            },
          })}
        />
        <TextField
          name="retype_password"
          label="Confirm Password"
          variant="outlined"
          size="small"
          type={password2Visible ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                component={IconButton}
                onClick={() => setPassword2Visible(!password2Visible)}
              >
                {password2Visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </InputAdornment>
            ),
          }}
          fullWidth
          error={Boolean(errors.retype_password)}
          helperText={
            errors.retype_password &&
            (errors.retype_password.message || "Confirm Password is required")
          }
          {...register("retype_password", {
            required: true,
            validate: (val) => {
              if (watch("password") !== val) {
                return "Your passwords do no match";
              }
            },
          })}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button variant="contained" sx={{ minWidth: "150px" }} type="submit">
            Update
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChangePassword;
