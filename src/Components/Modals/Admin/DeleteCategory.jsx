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

const DeleteCategory = ({ deleteId, handleModalClose }) => {

  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await toast.promise(myAxios.delete(`/category/${deleteId}/`), {
        pending: "Deleting Category...",
        success: "Category Deleted Successfully",
        error: "Error Deleting Food",
      });
      queryClient.invalidateQueries("categories");
      handleModalClose();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Dialog open={Boolean(deleteId)} onClose={handleModalClose}>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontWeight: 600 }}
        >
          Are you sure want to delete this category?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="outlined">
          Delete
        </Button>
        <Button onClick={handleModalClose} variant="outlined" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategory;
