import { Box, Avatar, Grid, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";

const EditRestaurantInfo = ({
  handleModalClose,
  data: restData,
  data: { id },
}) => {
  const { currentColor, refetch } = useStateContext();
  const [restaurantBanner, setRestaurantBanner] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const [color, setColor] = useColor(
    "hex",
    `${restData.colorCode ? restData.colorCode : "#121212"}`
  );

  const onSubmit = async (data) => {
    const payloadForm = new FormData();
    payloadForm.append("color", color?.hex);

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
    setValue("colorCode", restData?.color);
  }, [restData]);
  return (
    <Box
      sx={{
        p: 5,
      }}
    >
      <h2 className="text-xl font-bold pb-3">Edit Restaurants{color?.hex}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="colorCode"
            label="Restaurant Color Code"
            type="text"
            InputLabelProps={{ shrink: true }}
            defaultValue={restData?.color}
            // value={data?.color}
            value={color?.hex}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    marginRight: "-10px",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: color?.hex,
                    }}
                    className="w-11 h-11 rounded-md"
                  ></Box>
                </InputAdornment>
              ),
            }}
            {...register("colorCode")}
            fullWidth
          />
          <Box
            sx={{
              mt: 2,
            }}
          >
            <ColorPicker
              width={520}
              height={50}
              color={color}
              onChange={setColor}
              hideHEX
              hideHSV
              hideRGB
              hex
            />
          </Box>
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
                    src={restaurantBanner ?? restData?.banner}
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
