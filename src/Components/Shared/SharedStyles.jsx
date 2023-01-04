import {
  Box,
  Dialog,
  Modal,
  Skeleton,
  Switch,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Suspense } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
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
          minWidth: { xs: "90%", md: width ?? 600 },
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
export const CustomQRGenModal = ({
  open,
  onClose,
  children,
  width,
  center,
}) => {
  const { currentMode } = useStateContext();
  return (
    <Modal open={Boolean(open)} onClose={onClose} sx={{ overflowY: "scroll" }}>
      <Box
        className={`${currentMode === "Dark" ? "dark" : ""} `}
        sx={{
          // backgroundImage: `url(${BGIcon})`,
          display: center && "flex",
          justifyContent: center && "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: { xs: "90%", md: width ?? 600 },
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

export const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: theme.typography.pxToRem(13),
    border: "1px solid #dadde9",
    padding: 0,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#aaa",
  },
}));

export const CustomSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    backgroundColor: "#cb4d4d",
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));
