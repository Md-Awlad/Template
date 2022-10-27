import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import myAxios from "../../../utils/myAxios";

const DeleteCustomFood = ({ deleteId, handleClose }) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await toast.promise(myAxios.delete(`/customize_food/${deleteId}/`), {
        pending: "Deleting Discount...",
        success: "Discount Deleted Successfully",
        error: "Error Deleting Discount",
      });
      queryClient.invalidateQueries("discounts");
      handleClose();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Dialog open={Boolean(deleteId)} onClose={handleClose}>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontWeight: 600 }}
        >
          Are you sure want to delete this Custom Food?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="outlined">
          Delete
        </Button>
        <Button onClick={handleClose} variant="outlined" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCustomFood;
