import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Modal,
  Skeleton,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import { toast } from "react-toastify";
import { useStateContext } from "../../Contexts/ContextProvider";
import myAxios from "../../utils/myAxios";
import QueryLoader from "../Loaders/QueryLoader";

export const SuspenseLoader = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Box sx={{ height: "100vh" }}>
          <QueryLoader />
        </Box>
      }
    >
      {children}
    </Suspense>
  );
};

export const CustomModal = ({ open, onClose, children, width, center }) => {
  const { currentMode } = useStateContext();
  return (
    <Modal open={Boolean(open)} onClose={onClose} sx={{ overflowY: "scroll" }}>
      <Box
        className={currentMode === "Dark" ? "dark" : ""}
        sx={{
          display: center && "flex",
          justifyContent: center && "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: { xs: "90%", md: width ?? 900 },
          maxHeight: { xs: "100%", md: "auto" },
          bgcolor: currentMode === "Dark" ? "#33373E" : "background.paper",
          // border: "1px solid #707070",
          borderRadius: "4px",
          boxShadow: 24,
          // padding: 2,
          overflowY: "auto",
        }}
      >
        <Box className="dark:text-neutral ">{children}</Box>
      </Box>
    </Modal>
  );
};
export const CustomDialog = ({ open, onClose, children }) => {
  const { currentMode } = useStateContext();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={currentMode === "Dark" ? "dark" : ""}
    >
      <Box className="dark:bg-secondary-dark-bg dark:text-neutral">
        {children}
      </Box>
    </Dialog>
  );
};

export const LoadingSkeleton = () => (
  <Box
    sx={{
      height: "max-content",
    }}
  >
    {[...Array(7)].map((_, index) => (
      <Skeleton variant="rectangular" sx={{ my: 4, mx: 1 }} key={index} />
    ))}
  </Box>
);

export const CustomDelete = ({ deleteId, handleClose, path }) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await toast.promise(myAxios.delete(`/${path}/${deleteId}/`), {
        pending: `Deleting ${path}...`,
        success: `${path} Delete Successfully`,
        error: `Error Deleting ${path}`,
      });
      queryClient.invalidateQueries(`${path}`);
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
          Are you sure want to delete this {path}?
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
