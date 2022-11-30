import { Box, Avatar, Grid, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ColorPicker, toColor, useColor } from "react-color-palette";
// import { SketchPicker } from "react-color";
import "react-color-palette/lib/css/styles.css";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";
// import Hue from "@uiw/react-color-hue";
// import HexEditor from "react-hex-editor";
// import oneDarkPro from "react-hex-editor/themes/oneDarkPro";

const EditRestaurantInfo = ({ handleModalClose, data, data: { id } }) => {
  const { currentColor, refetch } = useStateContext();
  const [colorCode, setColorCode] = useState();
  const [restaurantBanner, setRestaurantBanner] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  // const [hsva, setHsva] = useState("#ffffff");
  const [color, setColor] = useColor("hex", "#121212");
  console.log(color);

  const onSubmit = async (data) => {
    const payloadForm = new FormData();
    payloadForm.append("name", data?.name);
    payloadForm.append("restaurants_email", data?.email);
    payloadForm.append("phone_number", data?.phone);
    payloadForm.append("address_one", data?.address_one);
    if (data?.addressTwo) {
      payloadForm.append("address_two", data?.address_two);
    }

    payloadForm.append("color", colorCode);
    // if (data?.logo[0]) {
    //   payloadForm.append("logo", data?.logo[0]);
    // }
    if (data?.banner[0]) {
      payloadForm.append("banner", data?.banner[0]);
    }
    await toast.promise(
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
  useEffect(() => {
    setValue("name", data?.name);
    setValue("phone", data?.phone_number);
    setValue("email", data?.email);
    setValue("address_one", data?.address_one);
    setValue("address_two", data?.address_two);
    setValue("colorCode", colorCode);
    // setValue("logo", data?.logo);
    // setValue("banner", data?.banner);
  }, [data]);
  return (
    <Box
      sx={{
        p: 5,
      }}
    >
      <h2 className="text-xl font-bold pb-3">Edit Restaurants{color?.hex}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* --name-- */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="name"
            label="Restaurant Name"
            type="text"
            InputLabelProps={{ shrink: true }}
            // value={data?.name}
            {...register("name")}
            fullWidth
          />
        </Grid>
        {/* --phone-- */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="phone"
            label="Restaurant Phone"
            type="text"
            InputLabelProps={{ shrink: true }}
            {...register("phone")}
            fullWidth
          />
        </Grid>

        {/* --email-- */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="email"
            label="Restaurant Email"
            type="text"
            InputLabelProps={{ shrink: true }}
            // value={data?.email || "no email"}
            {...register("email")}
            fullWidth
          />
        </Grid>
        {/* --address one-- */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="address"
            label="Restaurant Address One"
            type="text"
            InputLabelProps={{ shrink: true }}
            {...register("address_one")}
            fullWidth
          />
        </Grid>
        {/* --address two-- */}
        <Grid item xs={12} md={6}>
          <TextField
            id="address"
            label="Restaurant Address Two(optional)"
            type="text"
            InputLabelProps={{ shrink: true }}
            // value={data?.address_one || "no address"}
            {...register("address_two")}
            fullWidth
          />
        </Grid>
        {/* --color-- */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="colorCode"
            label="Restaurant Color Code"
            type="text"
            InputLabelProps={{ shrink: true }}
            // defaultValue={data?.color}
            // value={data?.color}
            value={color?.hex}
            // onChange={(e) => setColorCode(e.target.value)}
            // {...register("colorCode")}
            fullWidth
          />
          {/* <input
            defaultValue={data?.color}
            value={colorCode}
            onChange={(e) => setColorCode(e.target.value)}
            type="color"
            className="w-full h-6 border-neutral rounded-md"
          /> */}
          {/* <ColorPicker
            width={520}
            height={50}
            color={color}
            onChange={setColor}
            hideHEX
            hideHSV
            hideRGB
            hex
          /> */}
          {/* <Hue
            hue={hsva.h}
            onChange={(newHue) => {
              setHsva({ ...hsva, ...newHue });
            }}
          /> */}
        </Grid>

        {/* --logo-- */}
        {/* <Grid item xs={12} md={6}>
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
        </Grid> */}

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
