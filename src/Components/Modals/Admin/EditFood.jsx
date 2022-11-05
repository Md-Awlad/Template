import {
  Autocomplete,
  Button,
  Grid,
  InputAdornment,
  Modal,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";

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

const EditFood = ({ editId, handleModalClose, customizeFood }) => {
  console.log(customizeFood);
  const { currentColor } = useStateContext();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [extra, setExtra] = useState();
  const queryClient = useQueryClient();
  // const [SizeAndPrice, setSizeAndPrice] = useState(1);
  const onSubmit = async (data) => {
    const price = {};
    console.log(data);
    // data.item?.forEach((item) => {
    //   price[item.title] = item.price;
    // });
    data.item?.forEach((item) => {
      if (item.title.endsWith('"')) {
        console.log(item.title, item.price);
        const a = item?.title?.replace(/"/g, " inch");
        price[a] = item.price;
        console.log(price);
      } else if (variants > 1) {
        price[item.title] = item.price;
      } else {
        console.log("regular");
        price["regular"] = item.price;
        // price[item.title] = item.price;
        // price[item.title] = "regular";
        // console.log(price[item.title]);
      }
    });

    console.log(price);

    // const payloadForm = {
    //   food_name: data?.foodName,
    //   // food_detail: data?.detail,
    //   price: JSON.stringify(price),
    //   image: data?.image[0],
    //   base_ingredient: data?.ingredient,
    //   // taste: data?.taste,

    //   custom_food: JSON.stringify(extra?.map((a) => a?.id)),
    // };
    const payloadForm = new FormData();
    payloadForm.append("food_name", data?.foodName);
    // payloadForm.append("price", `'${JSON.stringify(price)}'`);
    payloadForm.append("price", `'${JSON.stringify(price)}'`);
    payloadForm.append("image", data?.image[0]);
    if (data?.package) {
      payloadForm.append("packaging", data?.package);
    }
    payloadForm.append("base_ingredient", data?.ingredient);

    if (extra) {
      payloadForm.append(
        "custom_food",
        JSON.stringify(extra?.map((a) => a?.id))
      );
    }

    await toast.promise(
      myAxios.patch(`/food/${editId}/`, payloadForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
      {
        pending: "Adding Foods...",
        success: "Food Added",
        error: "Error Adding Foods!",
      }
    );
    queryClient.invalidateQueries("food");
    handleModalClose();
  };
  const { data } = useQuery([`food`], () => myAxios(`/food/${editId}`), {
    onSuccess: ({ data: foodData = [] }) => {
      foodData.map((data, index) => {
        setValue("foodName", data?.food_name);
        setValue("ingredient", data?.base_ingredient);
        // setSizeAndPrice(Object.entries(data?.price).length);
        setValue(
          ` item.${index + 1}.title`,
          data?.title && Object.entries(data?.title).map((key) => key[0])
        );
        setValue(
          ` item.${index + 1}.price`,
          data?.price && Object.entries(data?.price).map((key) => key[1])
        );

        // setValue("detail", data?.food_detail);
        // setValue("taste", data?.taste);
        setValue("packaging", data?.packaging);
      });
    },
  });
  // data.map((item) => {
  //   if (item.price) {
  //     Object.entries(item.price).map((key) => console.log(key[0], key[1]));
  //   }
  // });
  // Object.values(data?.title).map((value) => console.log(value));
  // data.map((item) => console.log(item));

  const [variants, setVariants] = useState(1);
  // console.log(data.data.length);
  console.log(data);
  return (
    <Modal open={Boolean(editId)} onClose={handleModalClose}>
      <Box
        sx={{
          ...style,
          width: { sm: 700, xs: 400 },
          height: 500,
          overflowY: "scroll",
        }}
      >
        <h2 className="text-3xl font-bold pb-3 text-center">Edit Food Item</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {/* --FoodName-- */}
            <Grid item xs={12} md={6}>
              <TextField
                id="foodName"
                label="Food Name"
                type="text"
                InputLabelProps={{ shrink: true }}
                {...register("foodName")}
                fullWidth
              />
            </Grid>
            {/* --size&price--*/}
            <Grid item xs={12}>
              <Button
                sx={{ width: "100%", backgroundColor: `${currentColor}` }}
                variant="contained"
                onClick={() => setVariants((variants) => (variants += 1))}
              >
                Add Size and Price
              </Button>
              {new Array(variants).fill(null)?.map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: 2,
                      marginTop: 2,
                    }}
                  >
                    <TextField
                      label="Food Size"
                      type="text"
                      required={variants > 1 ? true : false}
                      {...register(`item.${index + 1}.title`)}
                      fullWidth
                    />
                    <TextField
                      required
                      label="Food Price"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      {...register(`item.${index + 1}.price`)}
                      fullWidth
                    />
                    <AiOutlineClose
                      onClick={() => setVariants((variants) => (variants -= 1))}
                      className={`text-5xl cursor-pointer text-red-700 ${
                        index === 0 && "hidden"
                      }`}
                    />
                  </Box>
                );
              })}
            </Grid>
            {/* --img-- */}
            <Grid item xs={12} md={6}>
              <TextField
                id="image"
                type="file"
                label="Food Image"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors.image)}
                helperText={errors.image && "Food image is required *"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FiUpload size={25} />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  accept: "image/*",
                }}
                {...register("image", { required: true })}
                sx={{
                  width: 1,
                  "& ::file-selector-button": {
                    display: "none",
                  },
                }}
              />
            </Grid>
            {/* --ingredient-- */}
            <Grid item xs={12} md={6}>
              <TextField
                id="ingredient"
                label="Base Ingredient"
                type="text"
                InputLabelProps={{ shrink: true }}
                {...register("ingredient")}
                fullWidth
              />
            </Grid>

            {/* --package-- */}
            <Grid item xs={12} md={6}>
              <TextField
                id="package"
                label="Packaging"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                InputLabelProps={{ shrink: true }}
                {...register("packaging")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                multiple
                disablePortal
                id="combo-box-demo"
                options={customizeFood?.map((custom) => custom)}
                getOptionLabel={(option) => option?.ingredient_name}
                filterSelectedOptions
                onChange={(_, newValue) => setExtra(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Customize Food" fullWidth />
                )}
              />
            </Grid>
            <div className="flex justify-end">
              <button
                type="submit"
                style={{ backgroundColor: currentColor }}
                className="rounded drop-shadow-sm bg-primary mx-3 w-24 p-2 text-base font-semibold text-white outline-none"
              >
                Update
              </button>
              <button
                onClick={handleModalClose}
                className="w-24 p-2 rounded-md font-semibold text-white bg-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default EditFood;
