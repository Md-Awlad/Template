import { Box, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";
import mainBanner from "../../../image/Cover-Banner-17.jpg";
import mainLogo from "../../../image/logo.png";

const RestaurantSetting = () => {
  const { restaurantData } = useStateContext();
  return (
    <Paper
      className="space-y-1 dark:bg-secondary-dark-bg dark:text-neutral"
      sx={{
        boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 20%)",
        border: "1px solid #ccc",
        position: "relative",
      }}
    >
      <Box>
        <img
          className="w-full object-cover h-44 rounded-tr-md rounded-tl-md"
          src={restaurantData?.banner || mainBanner}
          alt=""
        />
        <Box className="flex lg:flex-nowrap flex-wrap gap-10 my-10 mx-8">
          <Box className="border border-gray-600 py-10 w-full rounded-md">
            <img
              className="md:w-52 md:h-52 w-40 h-40 object-cover rounded-full m-auto"
              src={restaurantData?.logo || mainLogo}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  "https://i.ibb.co/L1v4dJD/resturant-Defalut-Banner.jpg";
              }}
              alt=""
            />
          </Box>
          <Box className="border border-gray-600 py-3 px-5 w-full rounded-md ">
            <Box>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  borderBottom: `1px dashed #707070`,
                  mb: "5px",
                }}
              >
                Restaurants Information
              </Typography>
              <Grid container sx={{ justifyContent: "space-between", mt: 2 }}>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box component="span">Name</Box>
                    <Box component="span">:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {restaurantData?.name || "Nexis Menu"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ justifyContent: "space-between", mt: 2 }}>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box component="span">Address</Box>
                    <Box component="span">:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {restaurantData?.address_one || "no address"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ justifyContent: "space-between", mt: 1 }}>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box component="span">Phone Number</Box>
                    <Box component="span">:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {restaurantData?.phone_number || ""}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ justifyContent: "space-between", mt: 1 }}>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box component="span">Email</Box>
                    <Box component="span">:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {restaurantData?.email || "no email set"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                  mt: 4,
                  // color: {},
                  fontWeight: 500,
                  fontSize: 11,
                }}
              >
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      Subscription End Date
                    </Box>
                    <Box component="span">:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {moment(restaurantData?.subscription_end_date).format(
                      "DD-MM-YYYY"
                    ) || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default RestaurantSetting;
