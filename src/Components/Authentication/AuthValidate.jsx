import LoginIcon from "@mui/icons-material/Login";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "../../utils/localStorages";
import { staticAxios } from "../../utils/myAxios";
import QueryLoader from "../Loaders/QueryLoader";

const AuthValidate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const refreshToken = searchParams.get("token");

  const { isLoading = true, isError = false } = useQuery(
    ["tokenValidate"],
    () => staticAxios.post("/token/refresh/", { refresh: refreshToken }),
    {
      enabled: Boolean(refreshToken),
      onSuccess: ({ access }) => {
        setAccessToken(access);
        setRefreshToken(refreshToken);
        setSearchParams({});
        queryClient.resetQueries();
        // navigate("/dashboard");
      },
    }
  );

  if (!Boolean(refreshToken)) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          width: { xs: "90%", sm: "70%", md: "50%" },
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          py: 2,
          borderRadius: "15px",
          "& .MuiInputBase-root, .MuiButton-root": {
            borderRadius: "10px !important",
            width: 1,
          },
        }}
      >
        <LoginIcon
          sx={{
            color: "primary.main",
            fontSize: "100px",
          }}
        />
        <Box component="span">
          <Typography variant="h4" textAlign="center">
            Authentication
          </Typography>
          {isLoading && (
            <Typography variant="subtitle2" gutterBottom textAlign="center">
              Please wait while validating..
            </Typography>
          )}
        </Box>
        {isLoading ? (
          <QueryLoader />
        ) : isError ? (
          <Fragment>
            <Alert severity="error" sx={{ width: 1 }}>
              <AlertTitle>Login Failed!</AlertTitle>
              Something went wrong while{" "}
              <strong>validating your authentication</strong>
            </Alert>

            <Button
              onClick={() => navigate("/auth")}
              variant="contained"
              size="small"
              sx={{
                width: 1,
                fontSize: "0.9rem",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              Try again?
            </Button>
          </Fragment>
        ) : (
          <Alert severity="success" sx={{ width: 1 }}>
            Login Success!
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default AuthValidate;
