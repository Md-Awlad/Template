import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import Footer from "../Frontend/Footer";
import Navbar from "../Navbar";
import { SuspenseLoader } from "../Shared/SharedStyles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function NavLayout() {
  return (
    <Box sx={{ display: "flex" }} className="bg-main-bg dark:bg-main-dark-bg">
      <Navbar />
      <Box
        // component="main"
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: "100vh",
        }}
      >
        <DrawerHeader />
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <SuspenseLoader>
            <Outlet />
          </SuspenseLoader>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
