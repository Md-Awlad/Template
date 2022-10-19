import { Box } from "@mui/system";
import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { Grid, InputAdornment, Modal } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

const EditCategory = ({ editId, handleClose }) => {
  const { currentColor, currentMode } = useStateContext();
  const { register, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    const payloadForm = {
      name: data?.category,
      image: data?.image[0],
    };

    const response = await toast.promise(
      myAxios.patch(`/category/${editId}/`, payloadForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
      {
        pending: "Adding Category...",
        success: "Category Added",
        error: "Error Adding category!",
      }
    );
    queryClient.invalidateQueries("category");
    handleClose();
  };

  const { data } = useQuery(
    [`categories`],
    () => myAxios(`/category/${editId}`),
    {
      onSuccess: ({ data: categoryData = [] }) => {
        categoryData.map((data) => {
          setValue("category", data?.name);
        });
      },
    }
  );

  return (
    <Modal open={Boolean(editId)} onClose={handleClose}>
      <Box sx={{ ...style, width: 600 }}>
        <h2 className="text-3xl font-bold pb-3 text-center">Edit Category</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <Grid
            
              item
              xs={12}
              md={6}
            >
              <TextField
                InputLabelProps={{ shrink: true }}
                id="category"
                label="Name of Category"
                type="text"
                {...register("category", { required: true })}
                fullWidth
              />
            </Grid>

            {/* --img-- */}
            <Grid item xs={12} md={6}>
              <TextField
                id="image"
                type="file"
                label="Image"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ cursor: "pointer" }}>
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
            <div className="flex justify-end">
              <button
                type="submit"
                style={{ backgroundColor: currentColor }}
                className="rounded drop-shadow-sm bg-primary mx-3 w-24 p-2 text-base font-semibold text-white outline-none"
              >
                Update
              </button>
              <button
                onClick={handleClose}
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

export default EditCategory;
