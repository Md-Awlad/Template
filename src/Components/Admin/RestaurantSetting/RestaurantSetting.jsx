import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { useState } from "react";

const RestaurantSetting = () => {
  const { restaurantData } = useStateContext();
  const [openEdit, setOpenEdit] = useState(false);
  console.log(restaurantData);
  return (
    <Paper
      className="space-y-1 dark:bg-secondary-dark-bg dark:text-neutral"
      sx={{
        boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 20%)",
        border: "1px solid #ccc",
        position: "relative",
      }}
    >
      {restaurantData?.map((data, index) => (
        <Box key={index}>
          <img
            className="w-full object-cover h-44 rounded-tr-md rounded-tl-md"
            src={data?.banner}
            alt=""
          />
          <Box className="flex lg:flex-nowrap flex-wrap gap-10 my-10 mx-8">
            <Box className="border border-gray-600 py-10 w-full rounded-md">
              <img
                className="md:w-52 md:h-52 w-40 h-40 object-cover rounded-full m-auto"
                src={data?.logo}
                alt=""
              />
            </Box>
            <Box className="border border-gray-600 py-3 px-5 w-full rounded-md ">
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5"></Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    minWidth: 120,
                  }}
                  onClick={() => setOpenEdit(true)}
                >
                  <EditIcon
                    sx={{
                      fontSize: "15px",
                      mr: 1,
                    }}
                  />
                  Edit
                </Button>
              </Box> */}

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
                      {data?.name || "Nexis Menu"}
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
                      {data?.address ||
                        "6th Floor, House#30, Sonargaon Janapath Road, Sector#12, Uttara, Dhaka-1230."}
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
                      {data?.phone_number || "+880 1738-812828"}
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
                      {data?.restaurants_email || "info@nexisltd.com"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* {openEdit && (
                  <EditEmployeeEmergencyInfo
                    open={openEdit}
                    employeeRefetch={employeeRefetch}
                    employeeId={employeeId}
                    emergencyContacts={emergencyContacts}
                    handleClose={() => setOpenEdit(false)}
                  />
                )} */}
            </Box>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default RestaurantSetting;
