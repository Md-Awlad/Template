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

const DeleteConfirmOrder = ({ deleteId, handleClose }) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await toast.promise(myAxios.delete(`/order/${deleteId}/`), {
        pending: "Deleting food...",
        success: "Food Delete Successfully",
        error: "Error Deleting Food",
      });
      queryClient.invalidateQueries("order");
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
          Are you sure want to delete this food?
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

export default DeleteConfirmOrder;
