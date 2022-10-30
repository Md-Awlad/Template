import { Box } from "@mui/system";
import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Avatar, Grid, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import { FiUpload } from "react-icons/fi";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";
import { useState } from "react";

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

const EditRestaurantInfo = ({ handleModalClose, data, data: { id } }) => {
  const { currentColor, refetch } = useStateContext();
  const [restaurantLogo, setRestaurantLogo] = useState(null);
  const [restaurantBanner, setRestaurantBanner] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const payloadForm = new FormData();
    payloadForm.append("name", data?.name);
    payloadForm.append("restaurants_email", data?.email);
    payloadForm.append("phone_number", data?.phone);
    payloadForm.append("address", data?.address);
    payloadForm.append("color", data?.colorCode);
    if (data?.logo[0]) {
      payloadForm.append("logo", data?.logo[0]);
    }
    if (data?.banner[0]) {
      payloadForm.append("banner", data?.banner[0]);
    }
    for (let value of payloadForm) {
      console.log(value);
    }
    const response = await toast.promise(
      myAxios.patch(`/restaurant/${id}/`, payloadForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
      {
        pending: "Adding Restaurant Name...",
        success: "Restaurant Name Added",
        error: "Error Restaurant Name!",
      }
    );
    handleModalClose();
    refetch();
  };

  return (
    <Box
      sx={{
        ...style,
        width: { sm: 700, xs: 400 },
        height: 500,
        overflowY: "scroll",
      }}
    >
      <h2 className="text-xl font-bold pb-3">Edit Restaurants</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* --name-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="name"
            label="Restaurant Name"
            type="text"
            InputLabelProps={{ shrink: true }}
            defaultValue={data?.name}
            {...register("name")}
            fullWidth
          />
        </Grid>
        {/* --phone-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="phone"
            label="Restaurant Phone"
            type="text"
            InputLabelProps={{ shrink: true }}
            defaultValue={data?.phone_number}
            {...register("phone")}
            fullWidth
          />
        </Grid>

        {/* --email-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="email"
            label="Restaurant Email"
            type="text"
            InputLabelProps={{ shrink: true }}
            defaultValue={data?.restaurants_email}
            {...register("email")}
            fullWidth
          />
        </Grid>
        {/* --address-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="address"
            label="Restaurant Address"
            type="text"
            InputLabelProps={{ shrink: true }}
            defaultValue={data?.address}
            {...register("address")}
            fullWidth
          />
        </Grid>
        {/* --color-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="colorCode"
            label="Restaurant Color Code"
            type="text"
            InputLabelProps={{ shrink: true }}
            defaultValue={data?.color}
            {...register("colorCode")}
            fullWidth
          />
        </Grid>

        {/* --logo-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="logo"
            type="file"
            label="Restaurant Logo"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    marginRight: "-10px",
                  }}
                >
                  <Avatar
                    src={restaurantLogo ?? data?.logo}
                    variant="rounded"
                  />
                </InputAdornment>
              ),
            }}
            inputProps={{
              accept: "image/*",
            }}
            {...register("logo", {
              onChange: (e) =>
                setRestaurantLogo(URL.createObjectURL(e.target.files[0])),
            })}
            sx={{
              width: 1,
              "& ::file-selector-button": {
                display: "none",
              },
            }}
          />
        </Grid>

        {/* --banner-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="banner"
            type="file"
            label="Restaurant Banner"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    marginRight: "-10px",
                  }}
                >
                  <Avatar
                    src={restaurantBanner ?? data?.banner}
                    variant="rounded"
                  />
                </InputAdornment>
              ),
            }}
            inputProps={{
              accept: "image/*",
            }}
            {...register("banner", {
              onChange: (e) =>
                setRestaurantBanner(URL.createObjectURL(e.target.files[0])),
            })}
            sx={{
              width: 1,
              "& ::file-selector-button": {
                display: "none",
              },
            }}
          />
        </Grid>

        <button
          type="submit"
          style={{ backgroundColor: currentColor }}
          className="w-full px-8 py-2 rounded-md text-neutral text-lg uppercase"
        >
          Update
        </button>
      </form>
    </Box>
  );
};

export default EditRestaurantInfo;
